// Following lines of code were made with help of Mercy Kramlich

let startGame = true;
let gameRunning = false;
let gameFinish = false;
let gameWin = false;
let starX = [];
let starY = [];
let starAlpha = [];
let velocity = 0;
let rocketX = 0;
let rocketY = 0;

const acceleration = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  rocketX = windowWidth / 2;
  rocketY = windowHeight / 4;

  // Stars
  for (let i = 0; i < 1000; i++) {
    const x = Math.floor(Math.random() * windowWidth);
    const y = Math.floor(Math.random() * windowHeight);
    const alpha = Math.random();

    starX.push(x);
    starY.push(y);
    starAlpha.push(alpha);
  }
}

// Draw space
function space() {
  background(0, 0, 0);
  fill(255, 255, 255);

  // Draw stars
  for (let index in starX) {
    fill(255, 255, 255, starAlpha[index] * 255);
    ellipse(starX[index], starY[index], 3);
  }
  // Ground
  fill(100, 255, 250);
  rect(0, windowHeight - 100, windowWidth, 100);
}

// Draw a rocket
function rocket(x, y) {
  push();
  translate(x - 275, y);
  fill(200, 0, 0);
  triangle(300, 200, 325, 225, 275, 225);
  fill(150, 150, 255);
  rect(275, 225, 50, 100);
  fill(200, 0, 0);
  triangle(275, 280, 275, 350, 260, 300);
  triangle(325, 280, 325, 350, 340, 300);
  pop();
}

// Following lines of code were edited with help of ChatGPT; link: https://chatgpt.com/share/67094e04-6ebc-8004-8c4e-b0ca9036445c; https://chatgpt.com/share/67094f82-8db0-8004-ad76-2db375761ea0

function draw() {
  space();

  // Draw the rocket at its current position
  rocket(rocketX, rocketY);

  // Game logic
  if (startGame) {
    textSize(30);
    fill(200, 300, 200);
    textAlign(CENTER);
    text("PRESS KEY TO START GAME 🚀", windowWidth / 2, windowHeight / 5);
    if (keyIsPressed && key === " ") {
      startGame = false;
      gameRunning = true;
      gameFinish = false;
      gameWin = false;
    }
    rocketY = windowHeight / 100;
    velocity = 0;
  }
  if (gameRunning) {
    // Apply acceleration
    rocketY = rocketY + velocity;
    velocity = velocity + acceleration;

    // Control the rocket's upward thrust with space key
    if (keyIsPressed && key === " ") {
      velocity = velocity - 0.5;
    }

    // Fixing the rocket landing function with ChatGPT: https://chatgpt.com/share/67094f82-8db0-8004-ad76-2db375761ea0
    if (rocketY + 275 > windowHeight - 100) {
      gameRunning = false;

      if (velocity > 5) {
        gameFinish = true; // Crash
      } else {
        gameWin = true; // Successful landing
      }
    }
  }
  if (gameFinish) {
    textSize(30);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("GAME OVER 👀", windowWidth / 2, windowHeight / 5);

    if (mouseIsPressed) {
      resetGame();
    }
  }
  // gameFinish = false;
  // startGame = true;
  // gameWin = false;
  // gameRunning = false;

  if (gameWin) {
    textSize(30);
    fill(0, 255, 0);
    textAlign(CENTER);
    text("YOU WON! 🥳", windowWidth / 2, windowHeight / 5);

    if (mouseIsPressed) {
      resetGame();
    }
  }
}

// Reset the game state to the initial setup
function resetGame() {
  gameFinish = false;
  startGame = true;
  gameWin = false;
  gameRunning = false;

  rocketY = windowHeight / 4; // Reset the rocket position
  velocity = 0; // Reset velocity
}
