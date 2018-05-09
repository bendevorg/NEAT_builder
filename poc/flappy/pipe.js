class Pipe {
  constructor() {

    // How big is the empty space
    let spacing = 125;
    // Where is th center of the empty space
    let centery =  Math.floor(Math.random() * (GAME_HEIGHT - spacing)) + spacing;

    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = GAME_HEIGHT - (centery + spacing / 2);
    // Starts at the edge
    this.x = GAME_WIDTH;
    // Width of pipe
    this.w = 80;
    // How fast
    this.speed = 6;
  }

  // Did this pipe hit a bird?
  hits(bird) {
    if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (GAME_HEIGHT - this.bottom)) {
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
    game.rect(this.x, GAME_HEIGHT - this.bottom, this.w, this.bottom);
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