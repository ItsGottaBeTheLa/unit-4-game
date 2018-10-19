$(document).ready(function () {

	var characters = {

		"George St. Pierre" : {
			name: "George St. Pierre",
			health: 120,
			attack:15,
			enemyAttackBack: 15,
			imageUrl:"assets/images/stpierre.jpg"
		},

		"Conor McGregor" : {
			name: "Conor McGregor",
			health: 100,
			attack: 10,
			enemyAttackBack: 10,
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
    //Global Variable Bank
    var currSelectedCharacter;
    var combatants = []
    var currDefender;
    var turnCounter = 1;
    var killCount = 0;
    

    // console.log(characters);

    // This function will render fighters to the page
    var renderOne = function(character, renderArea, charStatus) {
        var charDiv = $("<div class = 'character' data-name = '" + character.name + "'>");
        var charName = $("<div class = 'character-name'>").text(character.name);
        var charImage = $("<img alt = 'image' class = 'character-image'>").attr("src",character.imageUrl);
        var charHealth = $("<div class = 'character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);

        if(charStatus === "enemy") {
            $(charDiv).addClass("enemy");
        }
        else if (charStatus === "defender") {
            currDefender = character;
            $(charDiv).addClass("targetEnemy");
        }
    };


    var renderCharacters = function(charObj, areaRender) {
        if (areaRender === "#characterSection") {
            $(areaRender).empty();
            for (var key in charObj) {
                if(charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender, "");
                }
            }
             
        }
        if (areaRender === "#selectedCharacter") {
            renderOne(charObj, areaRender, "");
        }
        if (areaRender === "#enemyCharacter") {
            for(var i = 0; i < charObj.length; i++) {
                renderOne(charObj[i], areaRender, "enemy");
            }
        
            //Create on.click event for each enemy
            $(document).on("click", ".enemy", function(){
                var name = ($(this).attr("data-name"));

                //if there is no defender, the clicked enemy will become defender
                if($("#defender").children().length === 0) {
                    renderCharacters(name, "#defender");
                    $(this).hide();
                }
            });
        
        }
        if (areaRender === "#defender") {
            $(areaRender).empty();
            for( var i = 0; i < combatants.length; i++) {
                if(combatants[i].name === charObj) {
                    renderOne(combatants[i], areaRender, "defender");
                }
            }
        }
        //Re-render defender when Attacked
        if (areaRender === "playerDamage") {
            $("#defender").empty();
            renderOne(charObj, "#defender", "defender");
        }
        //Re-render player character when attacked
        if (areaRender === "enemyDamage") {
            $("#selectedCharacter").empty();
            renderOne(charObj, "#selectedCharacter", "");
        }
        //Remove Defeated Enemy
        if (areaRender === "enemyDefeated") {
            $("#defender").empty();
        }

    };
    // Render all Characters to the page when game starts
    renderCharacters(characters, "#characterSection");
    // On click event for selecting character
    $(document).on("click", ".character", function(){
        //    console.log("this worked!");
        //Saving the clicked characters name
        var name = $(this).attr("data-name");
        // console.log(name);

        if (!currSelectedCharacter) {
            currSelectedCharacter = characters[name];
            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key]);
                }
            }
            // console.log(combatants);
            $("#characterSection").hide();

            renderCharacters(currSelectedCharacter, "#selectedCharacter");
            renderCharacters(combatants, "#enemyCharacter");
        }
    });
    $("#attackButton").on("click", function() {
        if($("#defender").children().length !== 0) {
            currDefender.health -= (currSelectedCharacter.attack * turnCounter);
            if(currDefender.health > 0) {
                renderCharacters(currDefender, "playerDamage");
                currSelectedCharacter.health -= currDefender.enemyAttackBack;
                renderCharacters(currSelectedCharacter, "enemyDamage");
            }
            
        }
        else {
            renderCharacters(currDefender, "enemyDefeated");
            killCount++;
            if (killCount >=3) {
                
            }
        }
        turnCounter++; 
    });  
});