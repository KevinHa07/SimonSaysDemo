var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var level = 0;


$(document).on("keydown", function() {
  if(level == 0){
    nextSequence();
    var id = $("h1").attr("id");
    $("#" + id).text("Level " + level);
  }

});


$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  userClickedPattern = [];
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  playSound(currentColor);
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
    playSound("wrong");
    var id = $("h1").attr("id");
    $("#" + id).text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

  if (currentLevel + 1 == level) {
    setTimeout(function(){
      nextSequence();
      var id = $("h1").attr("id");
      $("#" + id).text("Level " + level);
    }, 1000);

  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
