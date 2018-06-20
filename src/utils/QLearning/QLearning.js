class QLearning {
  constructor(
    amountOfActions,
    learningRate,
    futureSignificancy,
    probabilityToExplore,
    exploreDecay
  ) {
    if (amountOfActions instanceof QLearning) {
      this.QTable = amountOfActions.QTable;
      this.amountOfActions = amountOfActions.amountOfActions;
      this.learningRate = amountOfActions.learningRate;
      this.futureSignificancy = amountOfActions.futureSignificancy;
      this.probabilityToExplore = amountOfActions.probabilityToExplore;
      this.exploreDecay = amountOfActions.exploreDecay;
    } else {
      this.QTable = [];
      this.amountOfActions = amountOfActions;
      this.learningRate = learningRate;
      this.futureSignificancy = futureSignificancy;
      this.probabilityToExplore = probabilityToExplore;
      this.exploreDecay = exploreDecay;
    }
    this.currentState;
    this.lastState;
    this.currentAction;
    this.lastAction;
  }

  predict(state) {
    this.currentState = state;

    if (this.QTable[this.currentState] == null) {
      for (let i = 0; i < this.amountOfActions; i++) {
        this.QTable[this.currentState][i] = 0;
      }
    }

    let max = Number.MIN_SAFE_INTEGER;
    if (Math.random() > this.probabilityToExplore) {
      this.QTable[this.currentState].forEach((possibleReward, possibleAction) => {
        if (possibleReward > max) {
          this.lastAction = possibleAction;
          max = possibleReward;
        }
      });
    } else {
      this.probabilityToExplore =
        this.probabilityToExplore - this.probabilityToExplore * this.exploreDecay;
      this.lastAction = Math.floor(Math.random() * (this.amountOfActions + 1));
    }

    return this.lastAction;
  }

  update(state, reward) {
    this.lastState = this.currentState;
    this.currentState = state;

    if (this.QTable[this.currentState] == null) {
      for (let i = 0; i < this.amountOfActions; i++) {
        this.QTable[this.currentState][i] = 0;
      }
    }

    let max = Number.MIN_SAFE_INTEGER;
    this.QTable[this.currentState].forEach(possibleReward => {
      if (possibleReward > max) {
        max = possibleReward;
      }
    });
    this.QTable[this.lastState][this.lastAction] =
      this.QTable[this.lastState][this.lastAction] +
      this.learningRate *
        (reward + this.futureSignificancy * max - this.QTable[this.lastState][this.lastAction]);
  }

  copy() {
    return new QLearning(this);
  }

  mutate() {
    return;
  }
}

export default QLearning;
