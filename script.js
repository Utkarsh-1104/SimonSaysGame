let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPAttern = [];
let started = false;
let level = 0;

$("#start").on("click", function() {
    if(started === false) {
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userClickedPAttern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor((Math.random()) * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor)
}

$(".btn").click(function() { 
    let userChosenColor = $(this).attr("id");
    userClickedPAttern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor); 
    checkAnswer(); 
});

function playSound(name) {
    const userPlayedVoice = new Audio("/sounds/" + name + ".mp3");
    userPlayedVoice.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    if (gamePattern[userClickedPAttern.length - 1] === userClickedPAttern[userClickedPAttern.length - 1]) {
        if(gamePattern.length === userClickedPAttern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    }    
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Start To Restart");
        startOver(); 
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
