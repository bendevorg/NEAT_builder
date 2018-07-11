import { store } from '../../store/store';

class Asteroid {
  constructor() {
    this.canvas = store.getters.gameCanvas;

    this.width = 40;
    this.height = 40;
    this.minVelocity = 1;
    this.maxVelocity = 6;
    this.xVelocity = Math.floor(
      Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity
    );
    this.yVelocity = Math.floor(
      Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity
    );

    if (Math.random() > 0.5) {
      this.x = Math.random() > 0.5 ? this.canvas.width - 20 : 20;
      this.y = Math.floor(Math.random() * (this.canvas.height - 20));
    } else {
      this.x = Math.floor(Math.random() * (this.canvas.width - 20));
      this.y = Math.random() > 0.5 ? this.canvas.height - 20 : 20;
      this.yVelocity = Math.random;
    }

    if (this.y > 20) this.yVelocity *= -1;
    if (this.x > 20) this.xVelocity *= -1;
  }

  // Did this block hit an agent?
  hits(agent) {
    return (
      this.x >= agent.x &&
      this.x <= agent.x + agent.width &&
      this.y >= agent.y &&
      this.y <= agent.y + agent.height
    );
  }

  // Draw the pipe
  show(game) {
    game.stroke(255);
    game.fill(255);
    game.rect(0, 0, this.width, this.height);
  }

  // Update the pipe
  update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  // Has it moved offscreen?
  offscreen() {
    if (this.x >= this.canvas.width || this.x <= 0 || this.y >= this.canvas.height || this.y <= 0) {
      return true;
    }
    return false;
  }
}

export default Asteroid;
