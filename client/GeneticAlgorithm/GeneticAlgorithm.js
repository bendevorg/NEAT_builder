// Create the next generation
function nextGeneration(reset = false) {
  // Normalize the fitness values 0-1
  normalizeFitness(allAgents);
  // Generate a new set of agents
  activeAgents = generate(allAgents);
  // Copy those agents to another array
  allAgents = activeAgents.slice();
}

// Generate a new population of agents
function generate(oldAgents) {
  let newAgents = [];
  for (let i = 0; i < oldAgents.length; i++) {
    // Select an agent based on fitness
    let agent = poolSelection(oldAgents);
    newAgents[i] = agent;
  }
  return newAgents;
}

// Normalize the fitness of all agents
function normalizeFitness(agents) {
  // Make score exponentially better?
  for (let i = 0; i < agents.length; i++) {
    agents[i].score = Math.pow(agents[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < agents.length; i++) {
    sum += agents[i].score;
  }
  //console.log(sum);
  // Divide by the sum
  for (let i = 0; i < agents.length; i++) {
    agents[i].fitness = agents[i].score / sum;
  }
}


// An algorithm for picking one agent from an array
// based on fitness
function poolSelection(agents) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = Math.random();


  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= agents[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // TODO: Crossover
  // (this includes mutation)
  return agents[index].copy();
}