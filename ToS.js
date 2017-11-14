// var roles = {};


// function loadJSON() {
	// $.getJSON('roles.json', function(d) {
		// roles = d;
	// });
// }

$( document ).ready(function() {
function allAny() {
	$(".player").each(function(i) {
		$(this).children("input").eq(0).val("Player " + (i+1)).prop("disabled", false);
		$(this).children("input").eq(1).val("Role").prop("disabled", false);
		
	});
}

function vip() {
	$(".player").each(function(i) {
		var role = "";
		var align = "Town";
		var disabled = true;
		
		switch(i) {
			case 0:
				role = "Sheriff";
				break;
			case 1:
				role = "Crusader";
				break;
			case 2:
				role = "Psychic";
				break;
			case 3:
				role = "Vigilante";
				break;
			case 4:
				role = "Trapper";
				break;
			case 5:
				role = "Tracker";
				break;
			case 6:
			case 7:
				role = "TP";
				disabled = false;
				break;
			case 8:
				role = "TS";
				disabled = false;
				break;
			case 9: 
				role = "Guardian Angel";
				align = "ga";
				break;
			case 10:
				role = "Pirate";
				align = "pirate";
				break;
			case 11:
				role = "Coven Leader";
				align = "coven";
				break;
			case 12: 
				role = "Potion Master";
				align = "coven";
				break;
			case 13: 
				role = "Medusa";
				align = "coven";
				break;
			case 14: 
				role = "Random Coven";
				align = "coven";
				disabled = false;
		}
		$(this).children("input").eq(0).val(role).prop("disabled", disabled);
		$(this).children("input").eq(1).val("Player");
	});
	
}

$("#vipButton").click(vip());

$("#allAnyButton").click(allAny());

});
