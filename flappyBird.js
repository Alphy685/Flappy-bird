const canvas = document.getElementById('flappyBird');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 320;
canvas.height = 480;

// Bird properties
const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 20,
  height: 20,
  gravity: 2,
  lift: -25,
  velocity: 0,
  color: 'yellow'
};

// Pipe properties
const pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
const pipeSpeed = 2;

// Game variables
let score = 0;
let gameOver = false;

// Event listener for bird jump
document.addEventListener('keydown', () => {
  bird.velocity = bird.lift;
});

// Create pipes
function createPipe() {
  const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 20)) + 20;
  pipes.push({
    x: canvas.width,
    top: pipeHeight,
    bottom: canvas.height - (pipeHeight + pipeGap)
  });
}

// Game loop
function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over! Score: ' + score, canvas.width / 2, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  ctx.fillStyle = bird.color;
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Update bird position
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver = true;
  }

  // Draw and update pipes
  pipes.forEach(pipe => {
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);

    pipe.x -= pipeSpeed;

    if (pipe.x + pipeWidth < 0) {
      pipes.shift();
      score++;
    }

    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      gameOver = true;
    }
  });

  // Add new pipes
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 150) {
    createPipe();
  }

  // Draw score
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText('Score: ' + score, 10, 20);

  requestAnimationFrame(gameLoop);
}

// Start the game
createPipe();
gameLoop();
