function pushBadGuy() {
  if (Math.random() < 0.5) {
    spawnX = Math.random() < 0.5 ? -11 : 801;
    spawnY = Math.random() * canvas.height;
  } else {
    spawnX = Math.random() * canvas.width;
    spawnY = Math.random() < 0.5 ? -11 : 601
  }
  badGuys.push({
    x: spawnX, 
    y: spawnY, 
    w: 30, 
    h: 30, 
    speed: Math.ceil(Math.random()* 3),
    image: badGuyImage
  });
}

function badGuysMove(){  
  checkBulletHits();
  badGuys.forEach( function(i, j){
    if (i.x > Player1.x && !badGuyCollidesX(i, j, -i.speed)) {i.x -= i.speed;}
    if (i.x < Player1.x && !badGuyCollidesX(i, j, i.speed)) {i.x += i.speed;} 
    if (i.y > Player1.y && !badGuyCollidesY(i, j, -i.speed)) {i.y -= i.speed;}
    if (i.y < Player1.y && !badGuyCollidesY(i, j, i.speed)) {i.y += i.speed;}
  });
}

function badGuysDraw() {
  badGuys.forEach( function(i, j) {
    context.beginPath();
    context.strokeStyle="red";
    context.rect(i.x, i.y, i.w, i.h);
    context.drawImage(i.image, i.x - 12 , i.y - 12, 50, 50);
    context.lineWidth=1;
    context.stroke();
  });
}

function badGuyCollidesX (i, j, step) {
  for (k = badGuys.length - 1; k >= 0; k--){
    if (j != k && 
        i.x + step < badGuys[k].x + badGuys[k].w && 
        i.x + step + i.w > badGuys[k].x &&
        i.y < badGuys[k].y + badGuys[k].h && 
        i.y + i.h > badGuys[k].y) {
      return true;
    }
  }
  
  if (i.x + step < Player1.x + Player1.w &&
    i.x + step + i.w > Player1.x &&
    i.y < Player1.y + Player1.h &&
    i.y + i.h > Player1.y && 
    !i.hit) {
      Player1.health -= 40;
      if (Player1.health <= 0){
        gameOver = true;
        endMessage = " Game Over!";
      }
      i.hit = true;
      badGuys.splice(j,1); //remove the bad guy on impact
      return true;
    }
return false;
}

function badGuyCollidesY (i, j, step) {
  // console.log(i);
  // console.log(j);
  // console.log(step);
  for (k = badGuys.length - 1; k >= 0; k--){
    if (j != k && 
        i.x + step < badGuys[k].x + badGuys[k].w && 
        i.x + step + i.w > badGuys[k].x &&
        i.y < badGuys[k].y + badGuys[k].h && 
        i.y + i.h > badGuys[k].y) {
      
      return true;
    }
  }
  
  if (i.x + step < Player1.x + Player1.w &&
    i.x + step + i.w > Player1.x &&
    i.y < Player1.y + Player1.h &&
    i.y + i.h > Player1.y && 
    !i.hit) {
      Player1.health -= 40;
      if (Player1.health <= 0){
        gameOver = true;
        endMessage = " Game Over!";
      }
      i.hit = true;
      badGuys.splice(j,1); // reomove the bad guy on impact
      return true;
    }
return false;
}