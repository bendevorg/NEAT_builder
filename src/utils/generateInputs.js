import NeuralNetwork from './neural_network/NeuralNetwork';
import { store } from '../store/store';

export default (brain, params) => {
  let inputs = [];
  const parameters =
    brain instanceof NeuralNetwork ? store.getters.neuralNetwork : store.getters.QLearning;
  for (let i = 0; i < parameters.inputs.length; i++) {
    inputs[i] = parameters.inputs[i](params);
  }

  return brain instanceof NeuralNetwork ? inputs : inputs.join('');
}