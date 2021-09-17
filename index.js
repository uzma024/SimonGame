var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var startToggle=false;

$(document).keypress(function(){
  if(!startToggle){
    $("#level-title").text("Level "+level);
    nextSequence();
    startToggle=true;
  }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var lastIndex =userClickedPattern.length -1;
    checkAnswer(lastIndex);
});


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }else{
    var wrongAudio= new Audio('sounds/wrong.mp3');
    wrongAudio.play();
    $("body").addClass('game-over');
    setTimeout(function(){
      $("body").removeClass('game-over');
    },200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber= (Math.floor(Math.random() * 4));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
  var audioFile="sounds/"+name+".mp3"
  var audio = new Audio(audioFile);
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass('pressed');
  setTimeout(function(){
    $("#"+currentColour).removeClass('pressed');
  },100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
