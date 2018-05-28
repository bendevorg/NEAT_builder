import {store} from '../../store/store.js';

class Food {
  constructor(red, green, blue) {
    let canvas = store.getters.gameCanvas;
    
    this.width = 20;
    this.height = 20;

    this.x = Math.floor(Math.random() * canvas.width);
    this.x -= this.x%this.width;

    this.y = Math.floor(Math.random() * canvas.height);
    this.y -= this.y%this.height;

    this.red = 255;
    this.green = 255;
    this.blue = 255;
  }

  // Did this block hit an agent?
  hits(agent) {
    return false;
  }

  // Draw the pipe
  show(game) {
    game.fill(this.red, this.green, this.blue, 255);
    game.noStroke();
    game.rect(this.x, this.y, this.width, this.height);
  }
}

export default Food;