// var velocity = 2
var mouseX = 0;
var mouseY = 0;
var deltaX = 0;
var deltaY = 0;
var rotation = 0;
var xtarget = 0;
var ytarget = 0;
var bullets = [];

// variable for setInterval for firing a weapon on mousedown event
var firingState;

var shotSwitcher = 1;
var laserSwitcher = 0;
var laserFiles = [
  new Audio("laser.mp3"),
  new Audio("laser.mp3"),
  new Audio("laser.mp3"),
  new Audio("laser.mp3"),
  new Audio("laser.mp3"),
  new Audio("laser.mp3"),    
];

function Player () {
  this.x = 395;
  this.y = 295;
  this.w = 20;
  this.h = 20;
  this.velocity = 2
  this.weapons = {
    "1": {
      fireRate: 700,      
    },
    "2": {
      fireRate: 700,
      firingLocation: [0,35]      
    },
    "3": {
      fireRate: 700,
      firingLocation: [0,35,-70]      
    }
  }
  this.weaponCount = 3
  this.points = 0;
  this.health = 200;
  this.image = playerImage;
}



function playerMove(e) {
  //get the distance between the mouse and the ball on both axes
  //walk only the an eight of the distance to create a smooth fadeout
  var dx = (mouseX - Player1.x) * .25;
  var dy = (mouseY - Player1.y) * .125;
  //calculate the distance this would move ...
  var distance = Math.sqrt(dx*dx + dy*dy);
  //... and cap it at 5px
  if(distance > Player1.velocity){
    dx *= Player1.velocity/distance;
    dy *= Player1.velocity/distance;
  }
  
  //now move
  Player1.x += dx;
  Player1.y += dy;
}

function playerDraw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  // context.strokeStyle="blue";
  context.rect(Player1.x, Player1.y, Player1.w, Player1.h);
  context.lineWidth=1;
  // context.stroke();
  context.save();
  deltaX = mouseX - Player1.x;
  deltaY = mouseY - Player1.y;
  newAngle = Math.atan(deltaY / deltaX);
  context.translate(Player1.x + (Player1.w / 2), Player1.y + (Player1.h / 2) );
  context.translate(-Player1.x - (Player1.w / 2),-Player1.y - (Player1.h / 2));
  context.drawImage(Player1.image, Player1.x - 7, Player1.y - 5,Player1.w * 1.3, Player1.h * 1.3);
  context.restore();
}

function checkCollision() {
  coins.forEach( function(i, j){
    if ( collides(i, Player1) ) {
      console.log(Player1.velocity);
      Player1.points += i.points;
      if (Player1.velocity != 10 ) {
        console.log(i.speedUp);
        Player1.velocity += i.speedUp;
        console.log('After Velocity');
        console.log(Player1.velocity);
      }      
      coins.splice(0);
      createNewCoins();
    }
  });
}

function mouseMove(e) {
  if(e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  } else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
  // console.log("mouseX = " + mouseX + ", mouseY = " + mouseY);
}

canvas.addEventListener('mousemove', mouseMove, true);

canvas.addEventListener("mousedown", function() {
  // trigger the event when mouse is down
  // so weapons fire on click and on hold and 
  // feel less disjointed
  let fireRate = Player1.weapons[Player1.weaponCount].fireRate;



  myFunction(fireRate);


  // setTimeout(() => {
  //   createBullet(mouseX, mouseY, Player1.x, Player1.y);
  // }, fireRate)
  firingState = setInterval(loopBulletCreation, fireRate);
});

 // This closure is working to limit firing trigger, but parameters still seem funky
var myFunction = function(fireRate) {
  var lastTime = new Date();
  return function(fireRate) {
    console.log(fireRate);
    var now = new Date();
    if ((now - lastTime) < fireRate) return;
    lastTime = now; 

    createBullet(mouseX, mouseY, Player1.x, Player1.y);

  };
}();

canvas.addEventListener("mouseup", function() {
  clearInterval(firingState);
});

function loopBulletCreation() {
  for( let i = 0; i < Player1.weaponCount; i++) {
    createBullet(mouseX, mouseY, Player1.x, Player1.y);
  }
}

/*
* createBullet - creates the bullet, determines where it should be created 
* and pushed it toward a position on the screen
* targetX - x position of the mouse 
* targetY - y position of the mouse
* shooterX - x position of the player on screen
* shooterY - y position of the player on screen
*/
function createBullet(targetX, targetY, shooterX, shooterY) { 
  if (!gameOver) {

    // play firing sounds 
    laserFiles[laserSwitcher].currentTime = 0.1;
    laserFiles[laserSwitcher].play();
    laserSwitcher++;
    if (laserSwitcher > laserFiles.length - 1) {
      laserSwitcher = 0;
    
    }

    deltaY = 0 - shooterY; 
    rotation = Math.atan2(deltaY, 0);
    xtarget = Math.cos(rotation);
    ytarget = Math.sin(rotation);
    for( let i = 0; i < Player1.weaponCount; i++) {
      shooterX += Player1.weapons[Player1.weaponCount].firingLocation[i];

      bullets.push({
        active:true,
        x: shooterX,
        y: shooterY,
        speed: 10,
        xtarget: xtarget,
        ytarget: ytarget,
        w: 3,
        h: 10,
        color: 'black',
        angle: rotation
      });
    }
  }
}

function bulletsMove() {
  bullets.forEach( function(i, j) {
    i.x += i.xtarget * i.speed;
    i.y += i.ytarget * i.speed;
  });
}

function bulletsDraw() {
  bullets.forEach( function(i, j) {
    context.beginPath();
    context.save();
    context.fillStyle = 'red';
    context.rect(i.x, i.y, i.w, i.h);
    context.fill();
  });
}

function checkBulletHits() {
  if (bullets.length > 0 && badGuys.length > 0) {
    for (j = bullets.length - 1; j >= 0; j--) {
      for (k = badGuys.length - 1; k >= 0; k--) {
        if (collides(badGuys[k], bullets[j])) {
          // console.log("collides");
          badGuys.splice(k, 1);
          bullets.splice(j, 1);
          Player1.points += 1;
        }
      }
    }
  }
}