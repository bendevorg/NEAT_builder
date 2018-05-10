let parameters = {
  neuralNetwork: {
    inputLayers: 0,
    hiddenLayers: 0,
    learningRate: 0,
    activationFunction: null,
    inputs: []
  },
  geneticAlgorithm: {
    population: 0,
    mutationRate: 0,
    scoreFunction: null,
    fitnessExpression: null
  }
};

function setParameters(){
  //  Neural Network inputs
  parameters.neuralNetwork.inputLayers = Number.parseInt($('#inputLayers').val());
  parameters.neuralNetwork.hiddenLayers = Number.parseInt($('#hiddenLayers').val());
  parameters.neuralNetwork.learningRate = Number.parseFloat($('#learningRate').val());
  //parameters.neuralNetwork.activationFunction = $('#activationFunction').val();
  parameters.neuralNetwork.inputs = [];
  let inputCounter = 0;
  while ($('#input' + inputCounter).length !== 0){
    let input = $('#input' + inputCounter).val();
    parameters.neuralNetwork.inputs.push(math.parse(input).compile());
    inputCounter++;
  }

  // Genetic Algorithm Inputs
  parameters.geneticAlgorithm.population = Number.parseInt($('#populationSize').val());
  parameters.geneticAlgorithm.mutationRate = Number.parseFloat($('#mutationRate').val());
  parameters.geneticAlgorithm.scoreFunction = $('#scoreFunction').val();
  parameters.geneticAlgorithm.fitnessExpression = $('#fitnessExpression').val();

  // Q Learning Inputs
}