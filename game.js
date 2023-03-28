let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

function playNoise(name) {
    switch (name) {
        case "red":
            let red = new Audio('sounds/red.mp3');
            red.play();
            break;

        case "blue":
            let blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;

        case "green":
            let green = new Audio('sounds/green.mp3');
            green.play();
            break;

        case "yellow":
            let yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;

        default: console.log(name);
    }
}

let started = false;
$(document).keydown(function () {
    if (started === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = !started;
    }
    else {
        console.log("Game has started");
    }
});

function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playNoise(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    console.log(gamePattern);
};

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playNoise(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        let wrong = new Audio('sounds/wrong.mp3');
            wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
