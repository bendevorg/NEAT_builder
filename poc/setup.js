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

  $('#gameDescription').hide();
  $('#NNParams').hide();
  $('#GAParams').hide();
  $('#leaderboardParams').hide();

  //  Neural Network inputs
  parameters.neuralNetwork.inputLayers = Number.parseInt($('#inputLayers').val());
  parameters.neuralNetwork.hiddenLayers = Number.parseInt($('#hiddenLayers').val());
  parameters.neuralNetwork.learningRate = Number.parseFloat($('#learningRate').val());
  //parameters.neuralNetwork.activationFunction = $('#activationFunction').val();
  parameters.neuralNetwork.inputs = [];
  let inputCounter = 0;
  while ($('#input' + inputCounter).length !== 0){
    let input = 'return ' + $('#input' + inputCounter).val();
    for (let parameterName in objectToParameter){
      input = input.replace(new RegExp(parameterName, 'g'), objectToParameter[parameterName]);
    }
    parameters.neuralNetwork.inputs.push(new Function('params', input));
    inputCounter++;
  }

  // Genetic Algorithm Inputs
  parameters.geneticAlgorithm.population = Number.parseInt($('#populationSize').val());
  parameters.geneticAlgorithm.mutationRate = Number.parseFloat($('#mutationRate').val());
  parameters.geneticAlgorithm.scoreFunction = $('#scoreFunction').val();
  parameters.geneticAlgorithm.fitnessExpression = $('#fitnessExpression').val();

  $('#gameInfo').show();

  // Q Learning Inputs
}