var allCats = {};
var cards = [];
var categories = [];
var cardIndex = 0;

$(document).ready(function() {
    $.when(loadJSON()).then(function() {
        loadCategoryPicker();
    });
});

function loadCategoryPicker() {
    $('#articulate').html($('#TEMcategories').html());
    var i = 0;
    for(var cat in allCats) {
        var html = '<li class="category"><input data-cat='+ cat +' type="checkbox"';
        if(i<6) html += 'checked';
        html += '>' + cat +'</input></li>';
        $('#categories').append(html);
        i++;
    }
    $('#load').click(loadCards);
}

var loadJSON = function() {
    return $.getJSON('articulate.json', function(data) {
        allCats = data;
        //~ categories = cardsAndCats.shift();
        //~ cards = cardsAndCats;
    });
}

function loadCards() {
    var catsToLoad = [];
    $('.category [type=checkbox]').each(function() {
        if($(this).is(':checked') && allCats.hasOwnProperty($(this).attr('data-cat'))) {
            catsToLoad.push(allCats[$(this).attr('data-cat')]);
        }
    });
    console.log(catsToLoad);
    cards = generateCards(catsToLoad);
    $('#articulate').html($('#TEMcards').html());
    var cardHeight = categories.length*20;
    $('#cards').css('height', cardHeight + 'px');
    $('#cards').html('');
    cardIndex = 0;
    cards[cardIndex].draw();
    $('#next').click(nextCard);
    $('#previous').click(previousCard);
    $('#reverse').click(reverseCards);
}

function generateCards(cats) {
    var words = {};
    var maxCards = 0;
    var cards = [];
    for(var i=0; i<cats.length; i++) {
        if(cats[i].words.length>0) {
            categories.push(cats[i].name);
            words[cats[i].name] = cats[i].words;
            words[cats[i].name].sort(function() { return 0.5 - Math.random() });
            if(i == 0) {
                maxCards = words[cats[i].name].length;
            } else if (words[cats[i].name].length < maxCards) {
                maxCards = words[cats[i].name].length;
            }
        }
    }
    for(var i=0; i<maxCards; i++) {
        myWords = {};
        for(var j=0; j<categories.length; j++) {
            myWords[categories[j]] = words[categories[j]][i];
        }
        var card = new Card(myWords);
        console.log(card);
        cards.push(card);
    }
    console.log(cards);
    return cards;
}

function nextCard() {
    cardIndex++;
    if(cardIndex < cards.length) {
        cards[cardIndex].draw();
    }
    else {
        cardIndex--;
    }
}

function previousCard() {
    $('.card').each(function() {
        if($(this).attr("data-index") == cardIndex) {
            $(this).remove();
            cardIndex--;
        }
    });
}

function reverseCards() {
    cards.reverse();
    $('#cards').html('');
    cardIndex = 0;
    cards[cardIndex].draw();
}

function Card(words) {
    this.words = words;
    this.draw = function() {
        var cardHtml;
        var rot = parseInt(Math.random()*18-9);
        cardHtml = '<div class="card" data-index="'+ cardIndex +'" style="transform: rotate('+ rot +'deg)"><ul class="words">';
        for(var i=0; i<categories.length; i++) {
            cardHtml += '<li class="word '+ categories[i] +'">' + this.words[categories[i]] +'</li>';
        }
        cardHtml += '</ul></div>';
        $('#cards').append(cardHtml);
    }
}

