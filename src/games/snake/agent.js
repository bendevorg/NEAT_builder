import NeuralNetwork from '../../utils/neural_network/NeuralNetwork.js';
import mutate from '../../utils/GeneticAlgorithm/mutate.js';
import {store} from '../../store/store.js';

const DIRECTIONS = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

class Agent {
  constructor(brain){
    const parameters = store.getters.neuralNetwork;

    if (brain instanceof NeuralNetwork){
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(parameters.inputLayers, parameters.hiddenLayers, parameters.outputLayers);
      this.brain.setLearningRate(parameters.learningRate);
    }

    this.canvas = store.getters.gameCanvas;
    this.width = 20;
    this.height = 20;

    this.hunger = 0;
    this.maxHunger = 25;

    this.body = [{
      x: 1 * this.width,
      y: 0 * this.height
    },
    {
      x: 2 * this.width,
      y: 0 * this.height
    }];

    this.direction = DIRECTIONS.RIGHT;

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

  }

  copy(){
    return new Agent(this.brain);
  }

  // Display the bird
  show(game) {
    this.body.forEach(point => {
      game.fill(this.red, this.green, this.blue, 100);
      game.noStroke();
      game.rect(point.x, point.y, this.width, this.height);
    });
  }

  think(food){
    // Now create the inputs to the neural network
    let inputs = [];
    let head = this.body[this.body.length - 1];

    let params = [head, this, food, this.canvas];
    let parameters = store.getters.neuralNetwork;

    for (let i = 0; i < parameters.inputs.length; i++){
      inputs[i] = parameters.inputs[i](params);
    }

    // Get the outputs from the network
    let actions = this.brain.predict(inputs);
    this.turn(actions.indexOf(Math.max(...actions)));
  }

  isDead(){
    let starved = this.hunger >= this.maxHunger;
    let hitWall = this.body[this.body.length - 1].x >= this.canvas.width || this.body[this.body.length - 1].y >= this.canvas.height;
    let hitItself = false;
    if (!hitWall && !starved){
      for (let i = 0; i < this.body.length - 1; i++){
        if (this.body[i].x == this.body[this.body.length - 1].x && this.body[i].y == this.body[this.body.length - 1].y){
          hitItself = true;
          break;
        }
      }
    }
    return starved || hitWall || hitItself;
  }

  // Do nothing, turn left or turn right
  turn(action) {
    switch(action){
      case 0:
        // Do nothing
        break;
      case 1:
        // Turn left
        this.direction--;
        if (this.direction < DIRECTIONS.UP)
          this.direction = DIRECTIONS.LEFT;
        break;
      case 2:
        // Turn right
        this.direction++;
        if (this.direction > DIRECTIONS.LEFT)
          this.direction = DIRECTIONS.UP;
        break;
    }
    return;
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    for (let i = 0; i < this.body.length - 1; i++){
      this.body[i].x = this.body[i + 1].x;
      this.body[i].y = this.body[i + 1].y;
    }
    switch(this.direction){
      case DIRECTIONS.UP:
        this.body[this.body.length - 1].y -= this.height;
        break;
      case DIRECTIONS.RIGHT:
        this.body[this.body.length - 1].x += this.width;
        break;
      case DIRECTIONS.DOWN:
        this.body[this.body.length - 1].y += this.height;
        break;
      case DIRECTIONS.LEFT:
        this.body[this.body.length - 1].x -= this.width;
        break;
    }

    // Every frame it is alive increases the score
    //this.score++;
  }

}

export default Agent;