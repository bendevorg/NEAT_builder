import {store} from '../../store/store.js';

class Food {
  constructor(red, green, blue) {
    let canvas = store.getters.gameCanvas;
    
    this.width = 20;
    this.height = 20;

    this.x = Math.floor(Math.random() * (canvas.width - this.width));
    this.x -= this.x%this.width;

    this.y = Math.floor(Math.random() * (canvas.height - this.height));
    this.y -= this.y%this.height;

    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  // Did this block hit an agent?
  hits(agent) {
    return agent.body[agent.body.length - 1].x == this.x && agent.body[agent.body.length - 1].y == this.y;
  }

  // Draw the pipe
  show(game) {
    game.fill(this.red, this.green, this.blue, 70);
    game.noStroke();
    game.rect(this.x, this.y, this.width, this.height);
  }
}

export default Food;