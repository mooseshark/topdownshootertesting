
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var keys = [];

var coins = [];

var timeRemaining = 30;

var badGuys = [];
var spawnX, spawnY;

var gameOver = false;
var gameStart = true;
var gameTitle = "GAMEZ";
var endMessage = "";
var endStatsDisplay = "";

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

function init() {  
  canvas.width = 800;
  canvas.height = 1000;
  canvas.addEventListener("keydown", function (e) {
    // console.log(e);
    keys[e.code] = true;
   });
   canvas.addEventListener("keyup", function (e) {
    keys[e.code] = false;
   });
   canvas.onmousemove = mouseMove;

   Player1 = new Player(); 
  
  createNewCoins();
  // console.log(coins);
  setInterval(mainDraw, 20);
  playerStep();

}

function drawHUD() {
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.fillText("Health:", 10, 25);
  context.beginPath();
  if (Player1.health < 50) {
    context.strokeStyle= 'red';
  } else {
    context.strokeStyle= 'yellow';
  }
  context.moveTo(85,18);
  context.lineTo(85 + Player1.health, 18);
  context.lineWidth=15;
  context.stroke();
  context.fillStyle = 'black';
  context.fillText("Points:", 370, 25);
  context.fillText("Time remaining:", 585, 25);
  if (timeRemaining < 10) {
    context.fillStyle = "red"
  }
  context.fillText(Math.ceil(timeRemaining), 750, 25);
  context.fillStyle = 'yellow';
  context.fillText(Player1.points, 445, 25);
}

function titleScreen() {
  context.font = '80pt Calibri';
  context.fillStyle = 'black';
  context.fillText(gameTitle, 70, 140);
  context.fillText("Press enter to Start!", 180, 400);

  if ( keys['Enter'] ) {
    gameOver = false;
    gameStart = true;
    Player1.points = 0;
    Player1.health = 200;
    coins.splice(0);
    createNewCoins();
    timeRemaining = 30;

    badGuys.splice(0);
    Player1.x = 395;
    Player1.y = 295;
    
  }
}

function endStats() {
  context.font = '80pt Calibri';
  context.fillStyle = 'black';
  context.fillText(endMessage, 70, 140);
  context.font = '80pt Calibri';
  context.fillStyle = 'black';
  context.fillText("Your Score:", 70, 240);
  context.fillStyle = 'yellow';
  context.fillText(Player1.points, 580, 240);
  context.font = '30pt Calibri';
  context.fillStyle = 'black';
  context.fillText("Press enter to play again!", 180, 400);

  if ( keys['Enter'] ) {
    gameOver = false;
    Player1.points = 0;
    Player1.health = 200;
    Player1.velocity = 2;
    coins.splice(0);
    createNewCoins();
    timeRemaining = 30;

    badGuys.splice(0);
    Player1.x = 395;
    Player1.y = 295;
    
  }

  if (keys['KeyC']) {
    endStatsDisplay = "credits";
  }

  if (endStatsDisplay === "credits") {
    context.font = '20pt Calibri';
    context.fillStyle = 'cyan';
    context.fillText("Thanks for playing!", 300, 30);
    context.fillText("https://warrendavies.net", 250, 70);
    context.save();
    context.translate(20,130);
    context.font = '16pt Calibri';
    context.fillStyle = 'white';
    context.fillText("Graphics Thanks:", 0, 0);
    context.font = '12pt Calibri';
    context.fillText("Vortex background by darkrose:", 0, 30);
    context.fillText("http://opengameart.org/users/darkrose", 0, 50);
    context.fillText("Player and bad guys by C-TOY:", 0, 90);
    context.fillText("http://c-toy.blogspot.co.uk", 0, 110);
    context.fillText("Orbs by AMON:", 0, 150);
    context.fillText("http://opengameart.org/users/amon", 0, 170);
    context.restore();
    context.save();
    context.translate(450,130);
    context.font = '16pt Calibri';
    context.fillStyle = 'white';
    context.fillText("Sound Thanks:", 0, 0);
    context.font = '12pt Calibri';
    context.fillText("Laser and orb collection sounds by Kenney Vleugels", 0, 30);
    context.fillText("http://www.kenney.nl", 0, 50);
    context.fillText("Bad guy explosion by dklon:", 0, 90);
    context.fillText("http://opengameart.org/users/dklon", 0, 110);
    context.restore();
    context.font = '30pt Calibri';
    context.fillStyle = 'white';
    context.fillText("Press enter to play again!", 190, 455);
    context.fillText("Press S for score", 250, 520);
   
    context.fillStyle = 'cyan';
  }
}

function mainDraw() { 
  if (gameStart) {
    if (!gameOver) {
      
      playerDraw();
      drawCoins();  
      drawHUD();
      badGuysMove();
      badGuysDraw();
      bulletsMove();
      bulletsDraw();
      if (Math.random() * 100 < 1 ) {
        pushBadGuy();
      }
      checkCollision();
      timeRemaining -= 0.02;
      if (timeRemaining < 0){ 
        gameOver = true;
        endMessage = " You Survived!"
      }
      
    } 
  }

  if (gameOver) {
    endStats();
  }

  if (!gameStart){
    titleScreen();
  }

}

function collides(a, b) {
  if (b){
    return a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y;
  }
}

function loadImages() {
  playerImage = new Image();
  playerImage.src = 'player.png';
  badGuyImage = new Image();
  badGuyImage.src = 'badguy.png';
  balls = new Image();
  balls.src = 'balls.png';
}
loadImages();


//use `requestAnimationFrame` for the game loop
//so you stay sync with the browsers rendering
//makes it a smoother animation
function playerStep(){
  playerMove();
  requestAnimationFrame(playerStep);
}