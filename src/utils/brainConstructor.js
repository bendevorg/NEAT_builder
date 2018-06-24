import AITypes from './AITypes';
import NeuralNetwork from './neural_network/NeuralNetwork';
import QLearning from './QLearning/QLearning';
import mutate from './GeneticAlgorithm/mutate';
import { store } from '../store/store';

export default brain => {
  let newBrain;
  if (AITypes.QLearning.includes(store.getters.brainType)) {
    if (brain instanceof QLearning) {
      newBrain= brain.copy();
    } else {
      const parameters = store.getters.QLearning;
      newBrain = new QLearning(
        parameters.amountOfActions,
        parameters.learningRate,
        parameters.futureSignificancy,
        parameters.probabilityToExplore,
        parameters.exploreDecay
      );
    }
  } else if (AITypes.neuralNetwork.includes(store.getters.brainType)) {
    if (brain instanceof NeuralNetwork) {
      newBrain = brain.copy();
      newBrain.mutate(mutate);
    } else {
      const parameters = store.getters.neuralNetwork;
      newBrain = new NeuralNetwork(
        parameters.inputLayers,
        parameters.hiddenLayers,
        parameters.outputLayers
      );
      newBrain.setLearningRate(parameters.learningRate);
    }
  }
  return newBrain;
}