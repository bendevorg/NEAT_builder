// All active agents (not yet collided with pipe)
let activeAgents = [];
// All agents for any given population
let allAgents = [];
// Pipes
let pipes = [];
// A frame counter to determine when to add a pipe
let counter = 0;

// Interface elements
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;

// All time high score
let highScore = 0;

let game = {
  width: 600,
  height: 400
};

//new p5(flappyBird);

let userInputs = [];

function flappyBird(pFive){

  pFive.setup = () => {
    let canvas = pFive.createCanvas(game.width, game.height);
    canvas.parent('canvascontainer');

    // Access the interface elements
    speedSlider = pFive.select('#speedSlider');
    speedSpan = pFive.select('#speed');
    highScoreSpan = pFive.select('#hs');
    allTimeHighScoreSpan = pFive.select('#ahs');
    
    // Create a population
    for (let i = 0; i < parameters.geneticAlgorithm.population; i++) {
      let agent = new Agent();
      activeAgents[i] = agent;
      allAgents[i] = agent;
    }
    nextGeneration();
  }

  pFive.draw = () => {
    pFive.background(0);

    // Should we speed up cycles per frame
    let cycles = speedSlider.value();
    speedSpan.html(cycles);

    // How many times to advance the pFive
    for (let n = 0; n < cycles; n++) {
      // Show all the pipes
      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }
      }

      // Running all the active agents
      for (let i = activeAgents.length - 1; i >= 0; i--) {
        let agent = activeAgents[i];
        // Bird uses its brain!
        agent.think(pipes);
        agent.update();

        // Check all the pipes
        for (let j = 0; j < pipes.length; j++) {
          // It's hit a pipe
          if (pipes[j].hits(activeAgents[i])) {
            // Remove this agent
            activeAgents.splice(i, 1);
            break;
          }
        }

        if (agent.bottomTop()) {
          activeAgents.splice(i, 1);
        }

      }

      // Add a new pipe every so often
      if (counter % 75 == 0) {
        pipes.push(new Pipe());
      }
      counter++;
    }

    // What is highest score of the current population
    let tempHighScore = 0;
    for (let i = 0; i < activeAgents.length; i++) {
      let s = activeAgents[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
      }
    }

    // Update DOM Elements
    highScoreSpan.html(tempHighScore);
    allTimeHighScoreSpan.html(highScore);

    // Draw everything!
    for (let i = 0; i < pipes.length; i++) {
      pipes[i].show(pFive);
    }

    for (let i = 0; i < activeAgents.length; i++) {
      activeAgents[i].show(pFive);
    }
    // If we're out of agents go to the next generation
    if (activeAgents.length == 0) {
      resetGame();
      nextGeneration();
    }
  }
}

// Start the game over
function resetGame() {
  counter = 0;
  pipes = [];
}

if (typeof module !== 'undefined')
  module.exports = flappyBird;