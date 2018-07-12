import { store } from '../../store/store';

class Pipe {
  constructor() {
    this.canvas = store.getters.gameCanvas;

    // How big is the empty space
    const spacing = 125;
    // Where is the center of the empty space
    const centery = Math.floor(Math.random() * (this.canvas.height - spacing)) + spacing;

    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = this.canvas.height - (centery + spacing / 2);

    this.width = 80;
    this.height = 40;

    this.x = this.canvas.width;

    this.y = this.canvas.height - this.height;
    if (Math.random() >= 0.5) this.y -= this.height + 10;

    this.speed = 6;
  }

  // Did this block hit an agent?
  hits(agent) {
    if (
      agent.y - agent.radius < this.top ||
      agent.y + agent.radius > this.canvas.height - this.bottom
    ) {
      if (agent.x > this.x && agent.x < this.x + this.width) {
        return true;
      }
    }
    return false;
  }

  // Draw the pipe
  show(game) {
    game.stroke(255);
    game.fill(200);
    game.rect(this.x, 0, this.width, this.top);
    game.rect(this.x, this.canvas.height - this.bottom, this.width, this.bottom);
  }

  // Update the pipe
  update() {
    this.x -= this.speed;
  }

  // Has it moved offscreen?
  offscreen() {
    if (this.x < -this.width) {
      return true;
    }
    return false;
  }
}

export default Pipe;
