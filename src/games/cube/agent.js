import NeuralNetwork from '../../utils/neural_network/NeuralNetwork';
import QLearning from '../../utils/QLearning/QLearning';
import brainConstructor from '../../utils/brainConstructor';
import generateInputs from '../../utils/generateInputs';
import {store} from '../../store/store.js';

const COLORS = {
  WHITE: 0,
  YELLOW: 1,
  BLUE: 2,
  GREEN: 3,
  RED: 4,
  ORANGE: 5
};

const COLOR_TO_RGB = {
  0: {
    red: 255,
    green: 255,
    blue: 255
  },
  1: {
    red: 255,
    green: 255,
    blue: 0
  },
  2: {
    red: 0,
    green: 0,
    blue: 255
  },
  3: {
    red: 0,
    green: 255,
    blue: 0
  },
  4: {
    red: 255,
    green: 0,
    blue: 0
  },
  5: {
    red: 255,
    green: 128,
    blue: 0
  }
};

const MOVES = {
  LEFT: 0,
  LEFT_INVERSE: 1,
  UP: 2,
  UP_INVERSE: 3,
  RIGHT: 4,
  RIGHT_INVERSE: 5,
  DOWN: 6,
  DOWN_INVERSE: 7,
  FRONT: 8,
  FRONT_INVERSE: 9,
  BACK: 10,
  BACK_INVERSE: 11
};

class Agent {
  constructor(brain){
    this.brain = brainConstructor(brain);

    this.lifeSpan = 300;

    this.canvas = store.getters.gameCanvas;

    let colorsToPick = [8, 8, 8, 8, 8, 8];

    const chooseColor = centralColor => {
      let shallowCube = colorsToPick.slice();
      const oppositeColor = centralColor % 2 == 0?centralColor + 1:centralColor - 1;
      shallowCube.splice(oppositeColor, 1);
      let pickSum = Math.floor(Math.random() * shallowCube.reduce(((a, b) => a + b)));
      let colorIndex = -1;
      if (pickSum == 0) {
        for (let i = 0; i < shallowCube.length; i++){
          if (shallowCube[i] > 0){
            colorIndex = i;
            break;
          }
        }
      } else {
        while (pickSum > 0){
          colorIndex++;
          pickSum -= shallowCube[colorIndex];
        }
      }
      colorIndex = colorIndex >= oppositeColor || colorIndex === -1?colorIndex + 1:colorIndex;
      colorsToPick[colorIndex]--;
      return colorIndex;
    }

    const fillFace = faceColor => {
      return [
        chooseColor(faceColor),
        chooseColor(faceColor),
        chooseColor(faceColor),
        chooseColor(faceColor),
        faceColor,
        chooseColor(faceColor),
        chooseColor(faceColor),
        chooseColor(faceColor),
        chooseColor(faceColor),
      ]
    }

    this.disposition = [
      fillFace(COLORS.WHITE),
      fillFace(COLORS.BLUE),
      fillFace(COLORS.RED),
      fillFace(COLORS.GREEN),
      fillFace(COLORS.ORANGE),
      fillFace(COLORS.YELLOW),
    ];

    this.score = 0;
    this.fitness = 0;

    this.lastInputs = [];
    this.lastAction = null;

  }

  copy(){
    return new Agent(this.brain);
  }

  // Display the bird
  show(game) {
    for (let i = 0; i < this.disposition.length; i++){
      for (let j = 0; j < this.disposition[i].length; j++){
        game.fill(COLOR_TO_RGB[this.disposition[i][j]].red,
          COLOR_TO_RGB[this.disposition[i][j]].green,
          COLOR_TO_RGB[this.disposition[i][j]].blue);
        game.stroke(0);
        game.rect(20 * (j % 3) + (80 * (i % 3)), 20 * Math.floor(j / 3) + (80 * Math.floor(i / 3)), 20, 20);
      }
    }
  }

  think(){
    // First find the closest pipe

    // Now create the inputs to the neural network
    let inputs = [];

    this.disposition.forEach(face => {
      face.forEach(color => {
        inputs.push(color / 5);
      })
    })

    // Get the outputs from the network
    let actions = this.brain.predict(inputs);
    this.lastInputs = inputs;
    this.lastAction = actions.indexOf(Math.max(...actions));
    this.turn(this.lastAction);
  }

  turn(action) {
    let firstAux;
    let secondAux;
    let thirdAux;
    let fourthAux;
    let fifthAux;
    let sixthAux;

    let firstIndex;
    let secondIndex;
    let thirdIndex;

    let firstColor;
    let secondColor;
    let thirdColor;
    let fourthColor;

    let frontOrBack = false;
    //  TODO: PLEASE REFACTOR THIS
    switch(action){
      case MOVES.LEFT:
        firstIndex = 0;
        secondIndex = 3;
        thirdIndex = 6;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.ORANGE;
        thirdColor = COLORS.RED;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.LEFT_INVERSE:
        firstIndex = 0;
        secondIndex = 3;
        thirdIndex = 6;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.RED;
        thirdColor = COLORS.ORANGE;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.UP:
        firstIndex = 0;
        secondIndex = 1;
        thirdIndex = 2;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.GREEN;
        thirdColor = COLORS.BLUE;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.UP_INVERSE:
        firstIndex = 0;
        secondIndex = 1;
        thirdIndex = 2;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.BLUE;
        thirdColor = COLORS.GREEN;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.RIGHT:
        firstIndex = 2;
        secondIndex = 5;
        thirdIndex = 8;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.ORANGE;
        thirdColor = COLORS.RED;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.RIGHT_INVERSE:
        firstIndex = 2;
        secondIndex = 5;
        thirdIndex = 8;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.RED;
        thirdColor = COLORS.ORANGE;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.DOWN:
        firstIndex = 6;
        secondIndex = 7;
        thirdIndex = 8;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.GREEN;
        thirdColor = COLORS.BLUE;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.DOWN_INVERSE:
        firstIndex = 6;
        secondIndex = 7;
        thirdIndex = 8;

        firstColor = COLORS.WHITE;
        secondColor = COLORS.BLUE;
        thirdColor = COLORS.GREEN;
        fourthColor = COLORS.YELLOW;
        break;
      case MOVES.FRONT:
        frontOrBack = true;

        firstAux = this.disposition[COLORS.ORANGE][6];
        secondAux = this.disposition[COLORS.ORANGE][7];
        thirdAux = this.disposition[COLORS.ORANGE][8];
        fourthAux = this.disposition[COLORS.BLUE][0];
        fifthAux = this.disposition[COLORS.BLUE][3];
        sixthAux = this.disposition[COLORS.BLUE][6];
        this.disposition[COLORS.ORANGE][6] = this.disposition[COLORS.GREEN][8];
        this.disposition[COLORS.ORANGE][7] = this.disposition[COLORS.GREEN][5];
        this.disposition[COLORS.ORANGE][8] = this.disposition[COLORS.GREEN][2];
        this.disposition[COLORS.BLUE][0] = firstAux;
        this.disposition[COLORS.BLUE][3] = secondAux;
        this.disposition[COLORS.BLUE][6] = thirdAux;
        firstAux = this.disposition[COLORS.RED][0];
        secondAux = this.disposition[COLORS.RED][1];
        thirdAux = this.disposition[COLORS.RED][2];
        this.disposition[COLORS.RED][0] = sixthAux;
        this.disposition[COLORS.RED][1] = fifthAux;
        this.disposition[COLORS.RED][2] = fourthAux;
        this.disposition[COLORS.GREEN][2] = firstAux;
        this.disposition[COLORS.GREEN][5] = secondAux;
        this.disposition[COLORS.GREEN][8] = thirdAux;
        break;
      case MOVES.FRONT_INVERSE:
        frontOrBack = true;
      
        firstAux = this.disposition[COLORS.ORANGE][6];
        secondAux = this.disposition[COLORS.ORANGE][7];
        thirdAux = this.disposition[COLORS.ORANGE][8];
        fourthAux = this.disposition[COLORS.GREEN][2];
        fifthAux = this.disposition[COLORS.GREEN][5];
        sixthAux = this.disposition[COLORS.GREEN][8];
        this.disposition[COLORS.ORANGE][6] = this.disposition[COLORS.BLUE][0];
        this.disposition[COLORS.ORANGE][7] = this.disposition[COLORS.BLUE][3];
        this.disposition[COLORS.ORANGE][8] = this.disposition[COLORS.BLUE][6];
        this.disposition[COLORS.GREEN][2] = thirdAux;
        this.disposition[COLORS.GREEN][5] = secondAux;
        this.disposition[COLORS.GREEN][8] = firstAux;
        firstAux = this.disposition[COLORS.RED][0];
        secondAux = this.disposition[COLORS.RED][1];
        thirdAux = this.disposition[COLORS.RED][2];
        this.disposition[COLORS.RED][0] = fourthAux;
        this.disposition[COLORS.RED][1] = fifthAux;
        this.disposition[COLORS.RED][2] = sixthAux;
        this.disposition[COLORS.BLUE][2] = thirdAux;
        this.disposition[COLORS.BLUE][5] = secondAux;
        this.disposition[COLORS.BLUE][8] = firstAux;
        break;
      case MOVES.BACK:
        frontOrBack = true;

        firstAux = this.disposition[COLORS.ORANGE][0];
        secondAux = this.disposition[COLORS.ORANGE][1];
        thirdAux = this.disposition[COLORS.ORANGE][2];
        fourthAux = this.disposition[COLORS.GREEN][0];
        fifthAux = this.disposition[COLORS.GREEN][3];
        sixthAux = this.disposition[COLORS.GREEN][6];
        this.disposition[COLORS.ORANGE][0] = this.disposition[COLORS.BLUE][2];
        this.disposition[COLORS.ORANGE][1] = this.disposition[COLORS.BLUE][5];
        this.disposition[COLORS.ORANGE][2] = this.disposition[COLORS.BLUE][8];
        this.disposition[COLORS.GREEN][0] = thirdAux;
        this.disposition[COLORS.GREEN][3] = secondAux;
        this.disposition[COLORS.GREEN][6] = firstAux;
        firstAux = this.disposition[COLORS.RED][6];
        secondAux = this.disposition[COLORS.RED][7];
        thirdAux = this.disposition[COLORS.RED][8];
        this.disposition[COLORS.RED][6] = fourthAux;
        this.disposition[COLORS.RED][7] = fifthAux;
        this.disposition[COLORS.RED][8] = sixthAux;
        this.disposition[COLORS.BLUE][2] = thirdAux;
        this.disposition[COLORS.BLUE][5] = secondAux;
        this.disposition[COLORS.BLUE][8] = firstAux;
        break;
      case MOVES.BACK_INVERSE:
        frontOrBack = true;

        firstAux = this.disposition[COLORS.ORANGE][0];
        secondAux = this.disposition[COLORS.ORANGE][1];
        thirdAux = this.disposition[COLORS.ORANGE][2];
        fourthAux = this.disposition[COLORS.BLUE][2];
        fifthAux = this.disposition[COLORS.BLUE][5];
        sixthAux = this.disposition[COLORS.BLUE][8];
        this.disposition[COLORS.ORANGE][0] = this.disposition[COLORS.GREEN][6];
        this.disposition[COLORS.ORANGE][1] = this.disposition[COLORS.GREEN][3];
        this.disposition[COLORS.ORANGE][2] = this.disposition[COLORS.GREEN][0];
        this.disposition[COLORS.BLUE][0] = firstAux;
        this.disposition[COLORS.BLUE][3] = secondAux;
        this.disposition[COLORS.BLUE][6] = thirdAux;
        firstAux = this.disposition[COLORS.RED][6];
        secondAux = this.disposition[COLORS.RED][7];
        thirdAux = this.disposition[COLORS.RED][8];
        this.disposition[COLORS.RED][6] = sixthAux;
        this.disposition[COLORS.RED][7] = fifthAux;
        this.disposition[COLORS.RED][8] = fourthAux;
        this.disposition[COLORS.GREEN][0] = firstAux;
        this.disposition[COLORS.GREEN][3] = secondAux;
        this.disposition[COLORS.GREEN][6] = thirdAux;
        break;
      default:
        break;
    }

    // Do the move
    if (!frontOrBack) {
      firstAux = this.disposition[firstColor][firstIndex];
      secondAux = this.disposition[firstColor][secondIndex];
      thirdAux = this.disposition[firstColor][secondIndex];
      fourthAux = this.disposition[secondColor][firstIndex];
      fifthAux = this.disposition[secondColor][secondIndex];
      sixthAux = this.disposition[secondColor][thirdIndex];
      this.disposition[firstColor][firstIndex] = this.disposition[thirdColor][firstIndex];
      this.disposition[firstColor][secondIndex] = this.disposition[thirdColor][secondIndex];
      this.disposition[firstColor][thirdIndex] = this.disposition[thirdColor][thirdIndex];
      this.disposition[secondColor][firstIndex] = firstAux;
      this.disposition[secondColor][secondIndex] = secondAux;
      this.disposition[secondColor][thirdIndex] = thirdAux;
      firstAux = this.disposition[fourthColor][firstIndex];
      secondAux = this.disposition[fourthColor][secondIndex];
      thirdAux = this.disposition[fourthColor][thirdIndex];
      this.disposition[fourthColor][firstIndex] = fourthAux;
      this.disposition[fourthColor][secondIndex] = fifthAux;
      this.disposition[fourthColor][thirdIndex] = sixthAux;
      this.disposition[thirdColor][firstIndex] = firstAux;
      this.disposition[thirdColor][secondIndex] = secondAux;
      this.disposition[thirdColor][thirdIndex] = thirdAux;
    }
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    let centralIndex = 4;
    this.score = 0;
    this.disposition.forEach(face => {
      for (let i = 0; i < face.length; i++){
        if (i !== centralIndex & face[i] == face[centralIndex]){
          this.score++;
        }
      }
    });
    this.lifeSpan -= 1;
  }

  isDead(){
    return this.lifeSpan <= 0;
  }

}

export default Agent;