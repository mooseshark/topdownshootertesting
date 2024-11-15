function createNewCoins() {
  coins.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    w: 20,
    h: 20, 
    points: 10,
    speedUp: 1,
    color: 'yellow', 
    sourceX: 0, 
    sourceY: 130, 
    sourceW: 130, 
    sourceH: 130
  });
  coins.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    w: 25,
    h: 25, 
    points: 10, 
    speedUp: 1,
    color: 'grey', 
    sourceX: 130, 
    sourceY: 130, 
    sourceW: 130, 
    sourceH: 130
  });
  coins.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    w: 50,
    h: 50, 
    points: 10, 
    speedUp: 1,
    color: 'green', 
    sourceX: 0, //source is location on character sheet
    sourceY: 0, 
    sourceW: 130, //source is orginial w and h
    sourceH: 130
  });
}

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

function drawCoins() {
  coins.forEach( function(i, j) {
    context.beginPath();
    context.strokeStyle=i.color;
    // context.rect(i.x, i.y, i.w, i.h);
    context.drawImage(balls, i.sourceX, i.sourceY, i.sourceW, i.sourceH, i.x, i.y, i.w, i.h);
    context.lineWidth=1;
    context.stroke();
  });
}