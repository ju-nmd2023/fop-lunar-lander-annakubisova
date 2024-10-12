let width = 600;
let height = 800;
let startGame = true;
let gameRunning = false;
let gameFinish = false;
let gameWin = false;
let starX = [];
let starY = [];
let starAlpha = [];
let velocity = -1;
let rocketX = 0;
let rocketY = 0;

const accelaration = 0.1;

function setup() {
  createCanvas(width, height);
}

// stars
for (let i = 0; i < 500; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  const alpha = Math.random();

  starX.push(x);
  starY.push(y);
  starAlpha.push(alpha);
}

function space() {
  background(0, 0, 0);
  fill(200, 200, 200);

  fill(255, 255, 255);
  for (let index in starX) {
    ellipse(starX[index], starY[index], 3);
  }
  rect(0, 700, 850, 150);
}

function rocket(x, y) {
  push();
  translate(x, y);
  fill(250, 0, 250);
  triangle(300, 200, 325, 225, 275, 225);
  fill(100, 0, 230);
  rect(275, 225, 50, 100);
  triangle(275, 280, 275, 350, 260, 300);
  triangle(325, 280, 325, 350, 340, 300);
  pop();
}

function draw() {
  space();

  rocket(rocketX, rocketY);
  if (startGame) {
    textSize(20);
    fill(200, 300, 200);
    text("PRESS KEY TO START GAME", width - 430, height / 5);
    if (keyIsPressed && key === " ") {
      startGame = false;
      gameRunning = true;
      gameFinish = false;
      gameWin = false;
    }
    rocketY = 0;
    velocity = 1;
  }
  if (gameRunning) {
    rocketY = rocketY + velocity;
    velocity = velocity + accelaration;

    if (keyIsPressed && key === " ") {
      velocity = velocity - 0.5;
      fire(0, rocketY);
    }

    if (rocketY > 390) {
      gameRunning = false;
      if (velocity > 5) {
        gameFinish = true;
      } else {
        gameWin = true;
      }
    }
  }
  if (gameFinish) {
    textSize(20);
    fill(200, 300, 200);
    text("GAME OVER", width - 350, height / 5);
    if (mouseIsPressed) {
      gameFinish = false;
      startGame = true;
      gameWin = false;
      gameRunning = false;
    }
  }

  if (gameWin) {
    textSize(20);
    fill(200, 300, 200);
    text("YOU WON!", width - 350, height / 5);
    if (mouseIsPressed) {
      gameFinish = false;
      startGame = true;
      gameRunning = false;
      gameWin = false;
    }
  }
}
