import {store} from '../store/store.js';

export default inputs => {
  let functionInputs = [];
  let gameParameters = store.getters.inputParameters;
  inputs.forEach(input => {
    let functionInput = `return ${input}`;
    for (let parameter in gameParameters){
      functionInput = functionInput.replace(new RegExp(parameter, 'g'), gameParameters[parameter]);
    }
    functionInputs.push(new Function('params', functionInput));
  });
  return functionInputs;
};
