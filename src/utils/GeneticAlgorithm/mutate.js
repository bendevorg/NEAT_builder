import {store} from '../../store/store.js';

function mutate(x) {
  let parameters = store.getters.genetic;
  if (Math.random() < parameters.mutationRate ) {
    let offset = randomGaussian() * 0.5;
    let newX = x + offset;
    return newX;
  } else {
    return x;
  }
}

// Random gaussian variables. This function is not mine, is from p5.js
let previous = false;
let y2 = 0;

function randomGaussian(mean, sd){
  let y1, x1, x2, w;
  if (previous) {
    y1 = y2;
    previous = false;
  } else {
    do {
      x1 = Math.random() * 2 - 1;
      x2 = Math.random() * 2 - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt(-2 * Math.log(w) / w);
    y1 = x1 * w;
    y2 = x2 * w;
    previous = true;
  }

  let m = mean || 0;
  let s = sd || 1;
  return y1 * s + m;
}

export default mutate;