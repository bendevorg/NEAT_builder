import {store} from '../../store/store.js';

class Block {
  constructor() {
    let canvas = store.getters.gameCanvas;
    
    this.width = 40;
    this.height = 40;

    this.x = canvas.width;

    this.y = canvas.height - this.height;
    if (Math.random() >= 0.5)
      this.y -= this.height + 10;

    this.speed = 6;
  }

  // Did this block hit an agent?
  hits(agent) {
    return (this.x <= agent.x + agent.width && this.x + this.width >= agent.x + agent.width) && 
      ((this.y - this.height < agent.y - agent.height && this.y > agent.y - agent.height) || 
      (this.y - this.height < agent.y && this.y >= agent.y));
  }

  // Draw the pipe
  show(game) {
    game.stroke(255);
    game.fill(255);
    game.rect(this.x, this.y, this.width, this.height);
  }

  // Update the pipe
  update() {
    this.x -= this.speed;
  }

  // Has it moved offscreen?
  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}

export default Block;