var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})


function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  var currentLevel = userClickedPattern.length;
  if (currentLevel === gamePattern.length) {
    checkAnswer(currentLevel);
  }
});


function checkAnswer(currentLevel) {

  var currentIndex = currentLevel - 1;

  // console.log("index: " + currentIndex + ", user: " + userClickedPattern + ", game: " + gamePattern);

  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (currentIndex > 0) {
      checkAnswer(currentIndex);
    }
    else {
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    startOver();
  }
}


function startOver() {

  playSound("wrong");

  $("body").addClass("game-over");
  var interval = setTimeout(setGameOver, 200);
  function setGameOver() {
    $("body").removeClass("game-over");
    clearTimeout(interval);
  }

  level = 0;
  gamePattern = [];
  started = false;

  $("#level-title").text("Game Over, Press Any Key to Restart");
}


function playSound(name) {
  var soundFile = "sounds/" + name + ".mp3"
  var audio = new Audio(soundFile);
  audio.play();
}


function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  var interval = setTimeout(setUnpressed, 100);

  function setUnpressed() {
    $("#" + currentColour).removeClass("pressed");
    clearTimeout(interval);
  }
}
