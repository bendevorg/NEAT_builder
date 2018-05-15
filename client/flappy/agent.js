class Agent {
  constructor(brain){
    if (brain instanceof NeuralNetwork){

      this.x = 64;
      this.y = game.height / 2;
      this.radius = 12;

      // Gravity, lift and velocity
      this.gravity = 0.8;
      this.lift = -12;
      this.velocity = 0;

      this.minVelocity = -5;
      this.maxVelocity = 5;

      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(parameters.neuralNetwork.inputLayers, parameters.neuralNetwork.hiddenLayers, 2);
      this.brain.setLearningRate(parameters.neuralNetwork.learningRate);
    }

    this.score = 0;
    this.fitness = 0;
  }

  copy(){
    return new Agent(this.brain);
  }

  // Display the bird
  show(game) {
    game.fill(255, 100);
    game.stroke(255);
    game.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  think(){

    // First find the closest pipe
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      // Now create the inputs to the neural network
      let inputs = [];

      let params = [this, closest, game];

      for (let i = 0; i < parameters.neuralNetwork.inputs.length; i++){
        inputs[i] = parameters.neuralNetwork.inputs[i](params);
      }
      // x position of closest pipe
      //inputs[0] = closest.x / GAME_WIDTH; // map(closest.x, this.x, width, 0, 1);
      // top of closest pipe opening
      //inputs[1] = closest.top / game.height; //map(closest.top, 0, game.height, 0, 1);
      // bottom of closest pipe opening
      //inputs[2] = closest.bottom / game.height;// map(closest.bottom, 0, game.height, 0, 1);
      // bird's y position
      //inputs[3] = this.y / game.height; //map(this.y, 0, game.height, 0, 1);
      // bird's y velocity
      //inputs[4] = this.velocity / 5; //map(this.velocity, -5, 5, 0, 1);

      // Get the outputs from the network
      let action = this.brain.predict(inputs);
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.up();
      }
    }

  }

  // Jump up
  up() {
    this.velocity += this.lift;
  }

  bottomTop() {
    // Bird dies when hits bottom?
    return (this.y > game.height || this.y < 0);
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // Every frame it is alive increases the score
    this.score++;
  }

}