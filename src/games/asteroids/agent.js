import brainConstructor from '../../utils/brainConstructor';
import generateInputs from '../../utils/generateInputs';
import { store } from '../../store/store';

const ACTIONS = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

class Agent {
  constructor(brain) {
    this.brain = brainConstructor(brain);

    this.canvas = store.getters.gameCanvas;
    this.width = 40;
    this.height = 40;

    this.x = this.width / 2;
    this.y = this.height / 2;

    // Gravity, lift and velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    this.maxVelocity = 7;

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
    game.triangle(
      this.x - this.width / 2,
      this.y + this.height / 2,
      this.x,
      this.y - this.height / 2,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }

  think(asteroids) {
    const closest = this.getClosest(asteroids);
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

  getClosest(asteroids) {
    // First find the closest asteroid
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < asteroids.length; i++) {
      const diff = asteroids[i].x - this.x + asteroids[i].y - this.y;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = asteroids[i];
      }
    }
    return closest;
  }

  takeAction(action) {
    switch (action) {
      case ACTIONS.UP:
        this.yVelocity -= 50;
        break;
      case ACTIONS.RIGHT:
        this.xVelocity += 50;
        break;
      case ACTIONS.DOWN:
        this.yVelocity += 50;
        break;
      case ACTIONS.LEFT:
        this.xVelocity -= 50;
        break;
      default:
        break;
    }
  }

  // Update agent's position based on velocity, etc.
  update() {
    this.xVelocity =
      Math.abs(this.xVelocity) > Math.abs(this.maxVelocity)
        ? this.maxVelocity * Math.sign(this.xVelocity)
        : this.xVelocity;

    this.yVelocity =
      Math.abs(this.yVelocity) > Math.abs(this.maxVelocity)
        ? this.maxVelocity * Math.sign(this.yVelocity)
        : this.yVelocity;

    if (this.x + this.xVelocity < this.canvas.width && this.x + this.xVelocity > 0) {
      this.x = this.x + this.xVelocity;
    } else if (this.x + this.xVelocity >= this.canvas.width) {
      this.x = this.canvas.width;
      this.xVelocity = 0;
    } else if (this.x + this.xVelocity <= 0) {
      this.x = 0;
      this.xVelocity = 0;
    }

    if (this.y + this.yVelocity < this.canvas.height && this.y + this.yVelocity > 0) {
      this.y = this.y + this.yVelocity;
    } else if (this.y + this.yVelocity >= this.canvas.height) {
      this.y = this.canvas.height;
      this.yVelocity = 0;
    } else if (this.y + this.yVelocity <= 0) {
      this.y = 0;
      this.yVelocity = 0;
    }
    
    // Every frame it is alive increases the score
    this.score++;
  }

  afterAction(asteroids, reward) {
    if (Object.prototype.hasOwnProperty.call(this.brain, 'afterAction')) {
      const closest = this.getClosest(asteroids);
      if (closest != null) {
        const params = [this, closest, this.canvas];
        const inputs = generateInputs(this.brain, params);
        this.brain.update(inputs.join(''), reward);
      }
    }
  }
}

export default Agent;
