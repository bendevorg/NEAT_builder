class Block {
  constructor() {

    this.width = 8;
    this.height = 8

    this.x = game.width;
    this.y = game.height - this.height;
    
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
    game.rect(this.x, this.y, this.weight, this.height);
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