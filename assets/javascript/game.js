$(document).ready(function () {

	var characters = {

		"George St Pierre" : {
			name: "George St. Pierre",
			health: 120,
			attack:15,
			enemyAttackBack: 15,
			imageUrl:"assets/images/stpierre.jpg"
		},

		"Conor McGregor" : {
			name: "Connor McGregor",
			health: 100,
			attack: 8,
			enemyAttackBack: 8,
			imageUrl:"assets/images/conor-mcgregor.jpg"
		},

		"Chuck Liddell" : {
			name: "Chuck Liddell",
			health: 150,
			attack:9,
			enemyAttackBack: 9,
			imageUrl:"assets/images/chuckliddell.jpg"
		},

		"Anderson Silva" : {
			name: "Anderson Silva",
			health: 100,
			attack: 12,
			enemyAttackBack: 12,
			imageUrl:"assets/images/anderson-silva.jpg"
        }


    
    };
    // console.log(characters);

    // This function will render fighters to the page
    var renderOne = function(character, renderArea) {
        var charDiv = $("<div class = 'character' data-name = '" + character.name + "'>");
        var charName = $("<div class = 'character-name'>").text(character.name);
        var charImage = $("<img alt = 'image' class = 'character-image'>").attr("src",character.imageUrl);
        var charHealth = $("<div class = 'character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    }

    var renderCharacters = function(charObj, areaRender) {
        if (areaRender === "#characterSection") {
            $(areaRender).empty();
            for (var key in charObj) {
                if(charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender);
                }
            }
             
        }
    }
    renderCharacters(characters, "#characterSection");


	
});