import brainConstructor from '../../utils/brainConstructor';
import generateInputs from '../../utils/generateInputs';
import { store } from '../../store/store';

const DIRECTIONS = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

class Agent {
  constructor(brain) {
    this.brain = brainConstructor(brain);

    this.canvas = store.getters.gameCanvas;
    this.width = 20;
    this.height = 20;

    this.hunger = 0;
    this.maxHunger = 25;

    this.body = [
      {
        x: 1 * this.width,
        y: 0 * this.height
      },
      {
        x: 2 * this.width,
        y: 0 * this.height
      }
    ];

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

    this.lastInputs = [];
    this.lastAction = null;
  }

  copy() {
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

  think(food) {
    // Now create the inputs to the neural network
    const params = [this, food, this.canvas];
    const inputs = generateInputs(this.brain, params);

    const actions = this.brain.predict(inputs);
    this.lastInputs = Array.isArray(inputs) ? inputs : inputs.split('');
    this.lastAction = Array.isArray(actions) ? actions.indexOf(Math.max(...actions)) : actions;

    this.takeAction(this.lastAction);
  }

  isDead() {
    const starved = this.hunger >= this.maxHunger;
    const hitWall =
      this.body[this.body.length - 1].x >= this.canvas.width ||
      this.body[this.body.length - 1].y >= this.canvas.height;
    let hitItself = false;
    if (!hitWall && !starved) {
      for (let i = 0; i < this.body.length - 1; i++) {
        if (
          this.body[i].x == this.body[this.body.length - 1].x &&
          this.body[i].y == this.body[this.body.length - 1].y
        ) {
          hitItself = true;
          break;
        }
      }
    }
    return starved || hitWall || hitItself;
  }

  // Do nothing, turn left or turn right
  takeAction(action) {
    switch (action) {
      case 0:
        // Do nothing
        break;
      case 1:
        // Turn left
        this.direction--;
        if (this.direction < DIRECTIONS.UP) this.direction = DIRECTIONS.LEFT;
        break;
      case 2:
        // Turn right
        this.direction++;
        if (this.direction > DIRECTIONS.LEFT) this.direction = DIRECTIONS.UP;
        break;
      default:
        break;
    }
    
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    for (let i = 0; i < this.body.length - 1; i++) {
      this.body[i].x = this.body[i + 1].x;
      this.body[i].y = this.body[i + 1].y;
    }
    switch (this.direction) {
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
      default:
        break;
    }
  }

  afterAction(food, reward) {
    if (Object.prototype.hasOwnProperty.call(this.brain, 'afterAction')) {
      if (food != null) {
        const params = [this, food, this.canvas];
        const inputs = generateInputs(this.brain, params);
        this.brain.afterAction(inputs.join(''), reward);
      }
    }
  }
}

export default Agent;
