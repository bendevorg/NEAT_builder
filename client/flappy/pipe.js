class Pipe {
  constructor() {

    // How big is the empty space
    let spacing = 125;
    // Where is the center of the empty space
    let centery =  Math.floor(Math.random() * (game.height - spacing)) + spacing;

    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = game.height - (centery + spacing / 2);
    // Starts at the edge
    this.x = game.width;
    // Width of pipe
    this.w = 80;
    // How fast
    this.speed = 6;
  }

  // Did this pipe hit a bird?
  hits(bird) {
    if ((bird.y - bird.radius) < this.top || (bird.y + bird.radius) > (game.height - this.bottom)) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  // Draw the pipe
  show(game) {
    game.stroke(255);
    game.fill(200);
    game.rect(this.x, 0, this.w, this.top);
    game.rect(this.x, game.height - this.bottom, this.w, this.bottom);
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