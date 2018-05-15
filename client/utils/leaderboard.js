let steps = 0;
let timeSpent = 0;
let timeStart;
let objectiveReached = false;

function sendScore(score){
  console.log('Objective reached, score: ' + score);
  console.log('Time: ' + (timeStart - new Date()));
}

function checkGoal(highScore){
  steps += 0.01;
  let currentTime = new Date();
  timeSpent += (currentTime - timeStart) * speedSlider.value();
  timeStart = currentTime;
  if (!objectiveReached && steps >= objective.steps){
    sendScore(highScore);
    objectiveReached = true;
  }
}
