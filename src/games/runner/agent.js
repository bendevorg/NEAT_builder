import NeuralNetwork from '../../utils/neural_network/NeuralNetwork.js';
import mutate from '../../utils/GeneticAlgorithm/mutate.js';
import {store} from '../../store/store.js';

class Agent {
  constructor(brain){
    let parameters = store.getters.neuralNetwork;

    if (brain instanceof NeuralNetwork){
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(parameters.inputLayers, parameters.hiddenLayers, 2);
      this.brain.setLearningRate(parameters.learningRate);
    }

    this.game = store.getters.gameParameters;
    this.width = 40;
    this.height = 40;

    this.x = this.width / 2;
    this.y = this.game.height - this.height;

    // Gravity, lift and velocity
    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    this.minVelocity = -13;
    this.maxVelocity = 13;

    this.score = 0;
    this.fitness = 0;
  }

  copy(){
    return new Agent(this.brain);
  }

  // Display the bird
  show(game) {
    game.fill(255);
    game.stroke(255);
    game.rect(this.x, this.y, this.width, this.height);
  }

  think(blocks){
    // First find the closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < blocks.length; i++) {
      let diff = blocks[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = blocks[i];
      }
    }

    if (closest != null) {
      // Now create the inputs to the neural network
      let inputs = [];

      let params = [this, closest, this.game];
      let parameters = store.getters.neuralNetwork;

      for (let i = 0; i < parameters.inputs.length; i++){
        inputs[i] = parameters.inputs[i](params);
      }

      // Get the outputs from the network
      let action = this.brain.predict(inputs);
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.jump();
      }
    }

  }

  // Jump up
  jump() {
    if (this.onTheFloor())
      this.velocity += this.lift;
  }

  bottomTop() {
    // Bird dies when hits bottom?
    return false;
  }

  onTheFloor(){
    return this.y >= this.game.height - this.height;
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    this.velocity += this.gravity;
    this.y = this.y + this.velocity > this.game.height - this.height?this.game.height - this.height:this.y + this.velocity;
    if (this.y == this.game.height - this.height && this.velocity > 0)
      this.velocity = 0;

    // Every frame it is alive increases the score
    this.score++;
  }

}

export default Agent;