import NeuralNetwork from '../../utils/neural_network/NeuralNetwork.js';
import QLearning from '../../utils/QLearning/QLearning.js';
import mutate from '../../utils/GeneticAlgorithm/mutate.js';
import { store } from '../../store/store.js';

class Agent {
  constructor(brain) {
    if (store.getters.brainType === 'QLearning') {
      if (brain instanceof QLearning) {
        this.brain = brain.copy();
      } else {
        const parameters = store.getters.QLearning;
        this.brain = new QLearning(
          parameters.outputLayers,
          parameters.learningRate,
          parameters.futureSignificancy,
          parameters.probabilityToExplore,
          parameters.exploreDecay
        );
      }
    }

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      const parameters = store.getters.neuralNetwork;
      this.brain = new NeuralNetwork(
        parameters.inputLayers,
        parameters.hiddenLayers,
        parameters.outputLayers
      );
      this.brain.setLearningRate(parameters.learningRate);
    }

    this.canvas = store.getters.gameCanvas;
    this.width = 40;
    this.height = 40;

    this.x = this.width / 2;
    this.y = this.canvas.height - this.height;

    // Gravity, lift and velocity
    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    this.minVelocity = -13;
    this.maxVelocity = 13;

    this.score = 0;
    this.fitness = 0;

    this.red = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);

    while (Math.abs(this.red - this.green - this.blue) < 40) {
      this.red = Math.floor(Math.random() * 255);
      this.green = Math.floor(Math.random() * 255);
      this.blue = Math.floor(Math.random() * 255);
    }

    this.lastInputs = [];
    this.lastAction = null;
  }

  copy() {
    return new Agent(this.brain);
  }

  // Display the bird
  show(game) {
    game.fill(this.red, this.green, this.blue, 70);
    game.noStroke();
    game.rect(this.x, this.y, this.width, this.height);
  }

  think(blocks) {
    
    const closest = this.getClosest(blocks);

    if (closest != null) {
      // Now create the inputs to the neural network
      let inputs = this.generateInputs(closest);

      // Get the outputs from the network
      if (this.brain instanceof NeuralNetwork) {
        const actions = this.brain.predict(inputs);
        this.lastInputs = inputs;
        this.lastAction = actions.indexOf(Math.max(...actions));
      } else if (this.brain instanceof QLearning) {
        this.lastInputs = inputs;
        this.lastAction = this.brain.predict(inputs.join(''));
      }

      // Decide to jump or not!
      if (this.lastAction === 1) {
        this.jump();
      }
    }
  }

  getClosest(blocks) {
    // First find the closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < blocks.length; i++) {
      const diff = blocks[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = blocks[i];
      }
    }
    return closest;
  }

  generateInputs(closest) {
    let inputs = [];

    const params = [this, closest, this.canvas];
    const parameters = store.getters.neuralNetwork;

    for (let i = 0; i < parameters.inputs.length; i++) {
      inputs[i] = parameters.inputs[i](params);
    }

    return inputs;
  }

  // Jump up
  jump() {
    if (this.onTheFloor()) this.velocity += this.lift;
  }

  bottomTop() {
    // Bird dies when hits bottom?
    return false;
  }

  onTheFloor() {
    return this.y >= this.canvas.height - this.height;
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    this.velocity += this.gravity;
    this.y =
      this.y + this.velocity > this.canvas.height - this.height
        ? this.canvas.height - this.height
        : this.y + this.velocity;
    if (this.y == this.canvas.height - this.height && this.velocity > 0) this.velocity = 0;

    // Every frame it is alive increases the score
    this.score++;
  }

  afterAction(blocks, reward) {
    if (this.brain instanceof QLearning) {
      const closest = this.getClosest(blocks);
      const inputs = this.generateInputs(closest);
      this.brain.update(inputs.join(''), reward);
    }
  }
}

export default Agent;
