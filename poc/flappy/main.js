// How big is the population
let totalPopulation = 500;
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

// Training or just showing the current best
let runBest = false;
let runBestButton;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvascontainer');

  // Access the interface elements
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);

  // Create a population
  for (let i = 0; i < totalPopulation; i++) {
    let agent = new Agent();
    activeAgents[i] = agent;
    allAgents[i] = agent;
  }
  bestAgent = activeAgents[0];
  nextGeneration(true);
}

// Toggle the state of the simulation
function toggleState() {
  runBest = !runBest;
  // Show the best agent
  if (runBest) {
    resetGame();
    runBestButton.html('continue training');
    // Go train some more
  } else {
    nextGeneration(true);
    runBestButton.html('run best');
  }
}

function draw() {
  background(0);

  // Should we speed up cycles per frame
  let cycles = speedSlider.value();
  speedSpan.html(cycles);


  // How many times to advance the game
  for (let n = 0; n < cycles; n++) {
    // Show all the pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    // Are we just running the best agent
    if (runBest) {
      bestAgent.think(pipes);
      bestAgent.update();
      for (let j = 0; j < pipes.length; j++) {
        // Start over, agent hit pipe
        if (pipes[j].hits(bestAgent)) {
          resetGame();
          break;
        }
      }

      if (bestAgent.bottomTop()) {
        resetGame();
      }
      // Or are we running all the active agents
    } else {
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
    }

    // Add a new pipe every so often
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  // What is highest score of the current population
  let tempHighScore = 0;
  // If we're training
  if (!runBest) {
    // Which is the best agent?
    let tempBestBird = null;
    for (let i = 0; i < activeAgents.length; i++) {
      let s = activeAgents[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = activeAgents[i];
      }
    }

    // Is it the all time high scorer?
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestAgent = tempBestBird;
    }
  } else {
    // Just one agent, the best one so far
    tempHighScore = bestAgent.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  // Update DOM Elements
  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);

  // Draw everything!
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

  if (runBest) {
    bestAgent.show();
  } else {
    for (let i = 0; i < activeAgents.length; i++) {
      activeAgents[i].show();
    }
    // If we're out of agents go to the next generation
    if (activeAgents.length == 0) {
      nextGeneration(true);
    }
  }
}