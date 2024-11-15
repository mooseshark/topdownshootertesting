// var velocity = 2
var mouseX = 0;
var mouseY = 0;
var deltaX = 0;
var deltaY = 0;
var rotation = 0;
var xtarget = 0;
var ytarget = 0;
var bullets = [];

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
  this.points = 0;
  this.health = 200;
  this.image = playerImage;
}

// function playerMove(e) {
//   // console.log(e);
//   // 2 keys can be used to set acceleration and decel like keys['KeyW'] && keys['Space']
//   keys['Space'] ? velocity = 3 : velocity = 2;

//   if ( keys['KeyW'] ) {
//     if ( Player1.y > 2 ) {
//       Player1.y -= Player1.velocity;
//     }
//   }
//   if ( keys['KeyS'] ) {
//     if ( Player1.y < canvas.height - Player1.h - 2 ) {
//       Player1.y += Player1.velocity;
//     }
//   }
//   if ( keys['KeyA'] ) {
//     if ( Player1.x > 2 ) {    
//       Player1.x -= Player1.velocity;
//     }
//   }
//   if ( keys['KeyD'] ) {
//     if ( Player1.x < canvas.width - Player1.w - 2 ) {
//       Player1.x += Player1.velocity;
//     }
//   }
//   return false;
// }

// function playerDraw() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.beginPath();  
//   context.fillStyle="red";
//   context.strokeStyle="blue";
//   context.rect(Player1.x, Player1.y, Player1.w, Player1.h);
//   context.lineWidth=1;
//   context.stroke();
//   context.fill();
// }

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

  // This block allows the shit to rotate and is unnecessary if I want the ship to always face forward. 
  // if (deltaX < 0) {
  //   context.rotate(newAngle);
  //   context.scale(-1, 1);
  // } else {
  //   context.rotate(newAngle);
  //   context.scale(1, -1);
  // }
  
  
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

canvas.addEventListener("click", function() {
  createBullet(mouseX, mouseY, Player1.x, Player1.y);
});

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

    laserFiles[laserSwitcher].currentTime = 0.1;
    laserFiles[laserSwitcher].play();
    laserSwitcher++;
    if (laserSwitcher > laserFiles.length - 1) {
      laserSwitcher = 0;
    
    }

    // deltaX = targetX - shooterX;
    // deltaY = targetY - shooterY;
    deltaY = 0 - shooterY; 
    rotation = Math.atan2(deltaY, 0);
    xtarget = Math.cos(rotation);
    ytarget = Math.sin(rotation);

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