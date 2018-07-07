import p5 from 'p5';
import brainConstructor from '../../utils/brainConstructor';
import generateInputs from '../../utils/generateInputs';
import { store } from '../../store/store';

const ACTIONS = {
  UP: 0,
  RIGHT: 1,
  LEFT: 3
};

class Agent {
  constructor(brain) {
    this.brain = brainConstructor(brain);

    this.canvas = store.getters.gameCanvas;
    this.radius = 20;

    this.heading = 0;
    this.rotation = 0;

    this.x = this.radius / 2;
    this.y = this.radius / 2;

    // Gravity, lift and velocity
    this.velocity = new p5.Vector(this.x, this.y);
    this.acceleration = 0;

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
    /**game.fill(this.red, this.green, this.blue, 70);
    game.noStroke();
    game.translate(this.x, this.y);
    game.rotate(this.heading);
    game.triangle(
      this.x - this.radius / 2,
      this.y + this.radius / 2,
      this.x,
      this.y - this.radius / 2,
      this.x + this.radius / 2,
      this.y + this.radius / 2
    );
    **/
   game.push();
   console.log(this.x);
   console.log(this.y);
   console.log(this.heading);
    game.translate(this.x, this.y);
    game.rotate(this.heading);
    game.fill(255);
    game.noStroke();
    game.triangle(-2 / 3 * this.radius, -this.radius,
               -2 / 3 * this.radius, this.radius,
                4 / 3 * this.radius, 0);
                game.pop();
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
        this.acceleration += 0.1;
        break;
      case ACTIONS.RIGHT:
        this.rotation += 0.08;
        break;
      case ACTIONS.LEFT:
        this.rotation -= 0.08;
        break;
      default:
        break;
    }
  }

  // Update agent's position based on velocity, etc.
  update() {

    this.heading += this.rotation;

    // Accelerate using the heading and the accelMagnitude
    const force = p5.Vector.fromAngle(this.heading);
    force.mult(this.acceleration);
    this.velocity.add(force);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.edges();
    
    // Every frame it is alive increases the score
    this.score++;
  }

  edges() {
    if (this.x > this.canvas.width + this.radius) {
      this.x = this.radius;
    } else if (this.x < -this.radius) {
      this.x = this.canvas.width - this.radius;
    }
    if (this.y > this.canvas.height + this.radius) {
      this.y = this.radius;
    } else if (this.canvas.y < -this.radius) {
      this.y = this.canvas.height - this.radius;
    }
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
