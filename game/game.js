window.onload=function(){




// PING PONG 

// VARIABLE DECLARATIONS
var play = document.getElementById('play');
var pause = document.getElementById('pause');
var reset = document.getElementById('reset');
var paddle = document.getElementById('paddle');
var ball = document.getElementById('ball');
var speedUp = document.getElementById('speedUp');
var speedDown = document.getElementById('speedDown');
var speedDisplay = document.getElementById('speedDisplay');
var sensitivityUp = document.getElementById('sensitivityUp');
var sensitivityDown = document.getElementById('sensitivityDown');
var sensitivityDisplay = document.getElementById('sensitivityDisplay');
var hitsDisplay = document.getElementById('hitsDisplay');
var gameOverDisplay = document.getElementById('gameOverDisplay');
var paddlePosition = 220;
var ballLeft = 40;
var ballTop = 200;
var increaseRight = true;
var increaseTop = false;
var increaseBottom = false;
var increaseTopHalf = false;
var increaseBottomHalf = false;
var increaseTopMost = false;
var increaseBottomMost = false;
var impact = 'middle';
var gameSpeed = 1;
var sensitivity = 15;
var hits = 0;
var naturalGame = true;
var volley;

// HELPER FUNCTIONS
// main animation control
function animateBall() {
  if(ballLeft >= 980) {
    increaseRight = false;
  }
  if(ballLeft <= 39) {
    var paddleCoords = paddle.getBoundingClientRect();
    var paddlePosition = paddleCoords.y + (paddleCoords.height / 2);
    var ballCoords = ball.getBoundingClientRect();
    var ballPosition = ballCoords.y + (ballCoords.height / 2);
    var difference = paddlePosition - ballPosition;
    if(difference < 3 && difference > -3) {
      ballAngle('middle');
    }
    else if(difference >= 3 && difference < 15) {
      ballAngle('top-half');
    }
    else if(difference <= -3 && difference > -15) {
      ballAngle('bottom-half');
    }
    else if(difference >= 15 && difference < 40) {
      ballAngle('top-edge');
    }
    else if(difference <= -15 && difference > -40) {
      ballAngle('bottom-edge');
    }
    else if(difference >= 40 && difference < 60) {
      ballAngle('top-most');
    }
    else if(difference <= -40 && difference > -60) {
      ballAngle('bottom-most');
    }
    else {
      impact = 'none';
      gameOver();
    }
    if(impact !== 'none') {
      increaseRight = true;
      hits++;
      hits % 10 === 0 ? levelUp() : null;
      hits === 3&& naturalGame ? winner() : null;
      renderHits();
    }
  }
  if(ballTop <= 10) {
    topWall();
  }
  if(ballTop >= 450) {
    bottomWall();
  }
  if(increaseRight) {
    ballLeft += gameSpeed;
  }
  else if(!increaseRight) {
    ballLeft -= gameSpeed;
  }
  if(increaseTop) {
    ballTop--;
  }
  if(increaseBottom) {
    ballTop++;
  }
  if(increaseTopHalf) {
    ballTop -= .5;
  }
  if(increaseBottomHalf) {
    ballTop += .5;
  }
  if(increaseTopMost) {
    ballTop -= 2;
  }
  if(increaseBottomMost) {
    ballTop += 2;
  }
  document.documentElement.style.setProperty('--ball-left', `${ballLeft}px`);
  document.documentElement.style.setProperty('--ball-top', `${ballTop}px`);
}

// controls angle of the ball
function ballAngle(angle) {
  if(angle === 'middle') {
    increaseTop = false;
    increaseTopHalf = false;
    increaseTopMost = false;
    increaseBottom = false;
    increaseBottomHalf = false;
    increaseBottomMost = false;
  }
  else if(angle === 'top-half') {
    increaseTop = false;
    increaseTopHalf = true;
    increaseTopMost = false;
    increaseBottom = false;
    increaseBottomHalf = false;
    increaseBottomMost = false;
  }
  else if(angle === 'bottom-half') {
    increaseTop = false;
    increaseTopHalf = false;
    increaseTopMost = false;
    increaseBottom = false;
    increaseBottomHalf = true;
    increaseBottomMost = false;
  }
  else if(angle === 'top-edge') {
    increaseTop = true;
    increaseTopHalf = false;
    increaseTopMost = false;
    increaseBottom = false;
    increaseBottomHalf = false;
    increaseBottomMost = false;
  }
  else if(angle === 'bottom-edge') {
    increaseTop = false;
    increaseTopHalf = false;
    increaseTopMost = false;
    increaseBottom = true;
    increaseBottomHalf = false;
    increaseBottomMost = false;
  }
  else if(angle === 'top-most') {
    increaseTop = false;
    increaseTopHalf = false;
    increaseTopMost = true;
    increaseBottom = false;
    increaseBottomHalf = false;
    increaseBottomMost = false;
  }
  else if(angle === 'bottom-most') {
    increaseTop = false;
    increaseTopHalf = false;
    increaseTopMost = false;
    increaseBottom = false;
    increaseBottomHalf = false;
    increaseBottomMost = true;
  }
}

// ball hits tops wall
function topWall() {
  if(increaseTop) {
    increaseTop = false;
    increaseBottom = true;
  }
  else if(increaseTopHalf) {
    increaseTopHalf = false;
    increaseBottomHalf = true;
  }
  else if(increaseTopMost) {
    increaseTopMost = false;
    increaseBottomMost = true;
  }
}

// ball hits bottom wall
function bottomWall() {
  if(increaseBottom) {
    increaseBottom = false;
    increaseTop = true;
  }
  else if(increaseBottomHalf) {
    increaseBottomHalf = false;
    increaseTopHalf = true;
  }
  else if(increaseBottomMost) {
    increaseBottomMost = false;
    increaseTopMost = true;
  }  
}

// renders game speed html
function renderSpeed(speed) {
  switch(speed) {
    case .5: return '0';
    case 1: return '1';
    case 1.5: return '2';
    case 2: return '3';
    case 2.5: return '4';
    case 3: return '5';
    case 3.5: return '6';
    case 4: return '7';
    case 4.5: return '8';
    case 5: return '9';
    case 5.5: return '10';
  }
}

// renders paddle sensitivity
function renderSensitivity() {
  switch(sensitivity) {
    case 5: return 'Lowest';
    case 10: return 'Low';
    case 15: return 'Normal';
    case 20: return 'High';
    case 25: return 'Highest';
  }
}

// renders paddle hits html
function renderHits() {
  hitsDisplay.innerHTML = hits.toString();
}

// level up
function levelUp() {
  if(gameSpeed < 5.5) {
    gameSpeed += .5;
  }
  speedDisplay.innerHTML = renderSpeed(gameSpeed);
}

// game over 
function gameOver() {
  gameOverDisplay.innerHTML = 'Game Over';
  document.documentElement.style.setProperty('--table-bg', '#e82525');
}

// winning game over
function winner() {
  gameOverDisplay.innerHTML = 'WINNER';
  clearInterval(volley);
  disableMouse();
  document.documentElement.style.setProperty('--table-bg', '#a449d8');
}

// paddle with mouse positioning
function mousePaddle(event) {
  if(event.clientY > 60 && event.clientY < 700) {
    paddlePosition = event.clientY -200;
    document.documentElement.style.setProperty('--paddle-top', `${paddlePosition}px`);
  } 
}

// enable mouse control for paddle 
function enableMouse() {
  frame.addEventListener('mousemove', mousePaddle);
}

// disable mouse control for paddle
function disableMouse() {
  frame.removeEventListener('mousemove', mousePaddle);
}

// EVENT LISTENERS
//paddle position
window.addEventListener('keydown', (event) => {
  if(event.keyCode === 38) {
    paddlePosition > 45 ? paddlePosition -= sensitivity : null;
  }
  else if(event.keyCode === 40) {
    paddlePosition < 950 ? paddlePosition += sensitivity : null;
  }
  document.documentElement.style.setProperty('--paddle-top', `${paddlePosition}px`);
});

// play button
play.addEventListener('click', (event) => {
  volley = setInterval(animateBall, 5);
  enableMouse();
});

// pause button
pause.addEventListener('click', (event) => {
  clearInterval(volley);
  disableMouse();
});

// reset button
reset.addEventListener('click', (event) => {
  clearInterval(volley);
  paddlePosition = 220;
  ballLeft = 39;
  ballTop = 200;
  increaseRight = true;
  increaseTop = false;
  increaseBottom = false;
  increaseTopHalf = false;
  increaseBottomHalf = false;
  impact = 'middle';
  gameSpeed = 1;
  hits = 0;
  document.documentElement.style.setProperty('--ball-left', `${ballLeft}px`);
  document.documentElement.style.setProperty('--ball-top', `${ballTop}px`);
  document.documentElement.style.setProperty('--paddle-top', `${paddlePosition}px`);
  document.documentElement.style.setProperty('--table-bg', 'rgb(28, 136, 179)');
  speedDisplay.innerHTML = renderSpeed(gameSpeed);
  renderHits();
  disableMouse();
  gameOverDisplay.innerHTML = '';
});

// speed up ball
speedUp.addEventListener('click', (event) => {
  if(gameSpeed < 5.5) {
    gameSpeed += .5;
  }
  naturalGame = false;
  speedDisplay.innerHTML = renderSpeed(gameSpeed);
});

// slow down ball
speedDown.addEventListener('click', (event) => {
  if(gameSpeed > .5) {
    gameSpeed -= .5;
  }
  speedDisplay.innerHTML = renderSpeed(gameSpeed);
});

// sensitivity up
sensitivityUp.addEventListener('click', (event) => {
  if(sensitivity < 25) {
    sensitivity += 5;
    sensitivityDisplay.innerHTML = renderSensitivity();
  }
});

// sensitivity down
sensitivityDown.addEventListener('click', (event) => {
  if(sensitivity > 5) {
    sensitivity -= 5;
    sensitivityDisplay.innerHTML = renderSensitivity();
  }
});

}