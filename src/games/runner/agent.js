import brainConstructor from '../../utils/brainConstructor';
import generateInputs from '../../utils/generateInputs';
import { store } from '../../store/store';

class Agent {
  constructor(brain) {
    this.brain = brainConstructor(brain);

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
      const params = [this, closest, this.canvas];
      const inputs = generateInputs(this.brain, params);
      // Get the outputs from the network
      const actions = this.brain.predict(inputs);
      this.lastInputs = Array.isArray(inputs) ? inputs : inputs.split('');
      this.lastAction = Array.isArray(actions) ? actions.indexOf(Math.max(...actions)) : actions;

      this.takeAction(this.lastAction);
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

  takeAction(action) {
    if (action === 1)
      this.jump();
  }

  // Jump up
  jump() {
    if (this.onTheFloor()) this.velocity += this.lift;
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
    if (Object.prototype.hasOwnProperty.call(this.brain, 'afterAction')) {
      const closest = this.getClosest(blocks);
      if (closest != null) {
        const params = [this, closest, this.canvas];
        const inputs = generateInputs(this.brain, params);
        this.brain.update(inputs.join(''), reward);
      }
    }
  }
}

export default Agent;
