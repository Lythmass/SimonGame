var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var isStarted = false;
var level = 1;

function nextSequence() {
     var randomNumber = Math.floor(Math.random() * 4);
     var randomChosenColor = buttonColors[randomNumber];
     $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
     makeSound(randomChosenColor);
     $("h1").text("Level " + level);
     level = level + 1;
     gamePattern.push(randomChosenColor);
     userClickedPattern.length = 0;
}

$(document).on("keydown", function() {
     if(!isStarted) {
          nextSequence();
          isStarted = true;
     }
});


$(".btn").on("click", handler);

function handler() {
     var userChosenColor = this.id;
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
     var incorrect = false;
     console.log(gamePattern);
     console.log(userClickedPattern);
     if(userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
          incorrect = true;
          var wrong = new Audio("sounds/wrong.mp3");
          wrong.play();
          $("body").addClass("game-over");
          setTimeout(function() {$("body").removeClass("game-over")}, 200);
          $("h1").text("Game Over, Press Any Key to Restart");
          isStarted = false; level = 1; gamePattern.length = 0; userClickedPattern.length = 0;
     }
     if(currentLevel == gamePattern.length - 1 && !incorrect) {
          setTimeout(function(){nextSequence()}, 1000);
     }
}


function playSound(name) {
     $("#" + name).fadeOut(100).fadeIn(100);
     makeSound(name);
}

function animatePress(currentColor) {
     $("." + currentColor).addClass("pressed");
     setTimeout(function() {$("." + currentColor).removeClass("pressed")}, 100);

}

function makeSound(randomColor) {
     switch(randomColor) {
          case "green":
               var green = new Audio("sounds/green.mp3");
               green.play();
               break;
          case "blue":
               var blue = new Audio("sounds/blue.mp3");
               blue.play();
               break;
          case "red":
               var red = new Audio("sounds/red.mp3");
               red.play();
               break;
          case "yellow":
               var yellow = new Audio("sounds/yellow.mp3");
               yellow.play();
               break;
     }
}
