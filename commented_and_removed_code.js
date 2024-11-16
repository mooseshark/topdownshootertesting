// Old playerMove() 11/15/2024
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


// Old playerDraw() 11/15/2024
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


// Old playerDraw() removing rotation code 11/15/2024
// function playerDraw() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.beginPath();
//   // context.strokeStyle="blue";
//   context.rect(Player1.x, Player1.y, Player1.w, Player1.h);
//   context.lineWidth=1;
//   // context.stroke();
//   context.save();
//   deltaX = mouseX - Player1.x;
//   deltaY = mouseY - Player1.y;
//   newAngle = Math.atan(deltaY / deltaX);
//   context.translate(Player1.x + (Player1.w / 2), Player1.y + (Player1.h / 2) );
//   context.translate(-Player1.x - (Player1.w / 2),-Player1.y - (Player1.h / 2));

//   //This Block was comemented out
//   // This block allows the shit to rotate and is unnecessary if I want the ship to always face forward. 
//   // if (deltaX < 0) {
//   //   context.rotate(newAngle);
//   //   context.scale(-1, 1);
//   // } else {
//   //   context.rotate(newAngle);
//   //   context.scale(1, -1);
//   // }
  
  
//   context.drawImage(Player1.image, Player1.x - 7, Player1.y - 5,Player1.w * 1.3, Player1.h * 1.3);
//   context.restore();
// }


// Old drawCoins() 11/15/2024
// function drawCoins() {
//   coins.forEach( function(i, j) {
//     context.beginPath();
//     context.fillStyle=i.color;
//     context.strokeStyle=i.color;
//     context.rect(i.x, i.y, i.w, i.h);
//     context.lineWidth=1;
//     context.stroke();
//     context.fill();
//   });
// }


// Old badGuysDraw 11/15/2024
// function badGuysDraw(){
//   badGuys.forEach( function(i, j) {
//     context.beginPath();
//     context.fillStyle="blue";
//     context.strokeStyle="red";
//     context.rect(i.x, i.y, i.w, i.h);
//     context.lineWidth=1;
//     context.stroke();
//     context.fill();
//   });
// }


// Old badGuysDraw 11/15/2024
// function createBullet(targetX, targetY, shooterX, shooterY) { 
//   if (!gameOver) {

//     laserFiles[laserSwitcher].currentTime = 0.1;
//     laserFiles[laserSwitcher].play();
//     laserSwitcher++;
//     if (laserSwitcher > laserFiles.length - 1) {
//       laserSwitcher = 0;
    
//     }
//     // thee control multidirectional shooting. Setting just 
//     // deltaY results in the bullet going straight up
//     // deltaX = targetX - shooterX;
//     // deltaY = targetY - shooterY;
//     deltaY = 0 - shooterY; 
//     rotation = Math.atan2(deltaY, 0);
//     xtarget = Math.cos(rotation);
//     ytarget = Math.sin(rotation);

//     bullets.push({
//       active:true,
//       x: shooterX,
//       y: shooterY,
//       speed: 10,
//       xtarget: xtarget,
//       ytarget: ytarget,
//       w: 3,
//       h: 10,
//       color: 'black',
//       angle: rotation
//     });

//   }
// }