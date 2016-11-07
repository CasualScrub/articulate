var cards = [];
var categories = [];
var cardIndex = 0;

$(document).ready(function() {
    $('#load').click(loadCards);
    $('#next').click(nextCard);
    $('#previous').click(previousCard);
    $('#reverse').click(reverseCards);
});

var loadCards = function() {
    return $.getJSON('articulate.json', function(data) {
        var cardsAndCats = generateCards(data.categories);
        categories = cardsAndCats.shift();
        cards = cardsAndCats;
        var cardHeight = categories.length*20;
        $('#cards').css('height', cardHeight + 'px');
        $('#cards').html('');
        cardIndex = 0;
        cards[cardIndex].draw();
    });
}

function generateCards(cats) {
    var words = {};
    var categories = [];
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
    cards.push(categories);
    for(var i=0; i<maxCards; i++) {
        myWords = {};
        for(var j=0; j<categories.length; j++) {
            myWords[categories[j]] = words[categories[j]][i];
        }
        var card = new Card(myWords);
        cards.push(card);
    }
    return cards;
}

function nextCard() {
    cardIndex++
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

