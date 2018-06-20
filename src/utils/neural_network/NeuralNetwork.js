import Matrix from '../math/Matrix.js';

class ActivationFunction {
  constructor(activation, deactivation) {
    this.activation = activation;
    this.deactivation = deactivation;
  }
}

const sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

class NeuralNetwork{
  constructor(inputNode, hiddenNodes, outputNodes){

    if (inputNode instanceof NeuralNetwork){
      this.inputNode = inputNode.inputNode;
      this.hiddenNodes = inputNode.hiddenNodes;
      this.outputNodes = inputNode.outputNodes;

      this.weightsInputHidden = inputNode.weightsInputHidden.copy();
      this.weightsHiddenOutput = inputNode.weightsHiddenOutput.copy();

      this.biasHidden = inputNode.biasHidden.copy();
      this.biasOutput = inputNode.biasOutput.copy();
    } else {
      this.inputNode = inputNode;
      this.hiddenNodes = hiddenNodes;
      this.outputNodes = outputNodes;
  
      this.weightsInputHidden = new Matrix(this.hiddenNodes, this.inputNode);
      this.weightsHiddenOutput = new Matrix(this.outputNodes, this.hiddenNodes);
      this.weightsInputHidden.randomize();
      this.weightsHiddenOutput.randomize();
  
      this.biasHidden = new Matrix(this.hiddenNodes, 1);
      this.biasOutput = new Matrix(this.outputNodes, 1);
      this.biasHidden.randomize();
      this.biasOutput.randomize();
  
    }

    this.setLearningRate();
    this.setActivationFunction();
  }

  predict(inputArray){

    let input = Matrix.fromArray(inputArray);

    let hidden = Matrix.multiply(this.weightsInputHidden, input);
    hidden.add(this.biasHidden);
    hidden.map(this.activationFunction.activation);

    let output = Matrix.multiply(this.weightsHiddenOutput, hidden);
    output.add(this.biasOutput);
    output.map(this.activationFunction.activation);

    return output.toArray();
  }

  train(inputArray, targetArray) {

    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(inputArray);

    // Feedforward
    let hidden = Matrix.multiply(this.weightsInputHidden, inputs);
    hidden.add(this.biasHidden);
    hidden.map(this.activationFunction.activation);

    let outputs = Matrix.multiply(this.weightsHiddenOutput, hidden);
    outputs.add(this.biasOutput);
    outputs.map(this.activationFunction.activation);

    // Convert array to matrix object
    let targets = Matrix.fromArray(targetArray);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let outputErrors = Matrix.subtract(targets, outputs);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = Matrix.map(outputs, this.activationFunction.activation);
    gradients.multiply(outputErrors);
    gradients.multiply(this.learningRate);

    // Calculate deltas
    let hiddenTransposed = Matrix.transpose(hidden);
    let weightsHiddenOutputDeltas = Matrix.multiply(gradients, hiddenTransposed);

    // Adjust the weights by deltas
    this.weightsHiddenOutput.add(weightsHiddenOutputDeltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.biasOutput.add(gradients);

    // Calculate the hidden layer errors
    let weightsHiddenOutputTransposed = Matrix.transpose(this.weightsHiddenOutput);
    let hiddenErrors = Matrix.multiply(weightsHiddenOutputTransposed, outputErrors);

    // Calculate hidden gradient
    let hiddenGradient = Matrix.map(hidden, this.activationFunction.activation);
    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(this.learningRate);

    // Calcuate input->hidden deltas
    let inputsTransposed = Matrix.transpose(inputs);
    let weightsInputHiddenDeltas = Matrix.multiply(hiddenGradient, inputsTransposed);

    this.weightsInputHidden.add(weightsInputHiddenDeltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.biasHidden.add(hiddenGradient);
  }

  copy() {
    return new NeuralNetwork(this);
  }

  // Accept an arbitrary function for mutation
  mutate(func) {
    this.weightsInputHidden.map(func);
    this.weightsHiddenOutput.map(func);
    this.biasHidden.map(func);
    this.biasOutput.map(func);
  }

  setLearningRate(learningRate = 0.1) {
    this.learningRate = learningRate;
  }

  setActivationFunction(func = sigmoid) {
    this.activationFunction = func;
  }

}

export default NeuralNetwork;
