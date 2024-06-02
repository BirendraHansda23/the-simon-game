var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userCLickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){

    if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    }
});

$(".btn").click(function() {
    var userChosencolour = $(this).attr("id");
    userCLickedPattern.push(userChosencolour);

    playSound(userChosencolour);
    animatePress(userChosencolour);

    checkAnswer((userCLickedPattern.length)-1);

});

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userCLickedPattern[currentLevel]){

        console.log("Success");

        if(userCLickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }

    else {
        
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over!\nPress any Key to Restart");

        startOver();
    }
}


function nextSequence(){

    userCLickedPattern =[]; //reset user sequence for next level

    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}




