var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;


if (started == false) {

  started = true;
  level = 0;

  $("#level-title").text("Press A Key to Start");

  $("body").keypress(function() {
    nextSequence();
  });
}


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


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  // console.log("userClickedPattern : " + userClickedPattern);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length);
});


function checkAnswer(currentLevel) {

  var currentIndex = currentLevel - 1;

  console.log("index: " + currentIndex + ", user: " + userClickedPattern + ", game: " + gamePattern);

  if(userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    console.log("correct");

    setTimeout(nextSequence, 1000);
  }
  else {
    console.log("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    level = 0;

    $("body").keypress(function() {
      nextSequence();
    });
  }
}
