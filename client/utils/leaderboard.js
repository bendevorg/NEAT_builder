let steps = 0;
let timeSpent = 0;
let timeStart;
let objectiveReached = false;

function sendScore(score, gameId){
  let entryInfo = {
    name: $('#username').val(),
    score: score,
    time: Math.floor(timeSpent / 1000)
  };

  $.ajax({
    type: "POST",
    url: apiUrl + '/api/leaderboard/' + gameId + '/new',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(entryInfo),
    dataType: "json",
    beforeSend: function(){
    },
    success: function(jsonData) {
      retrieveLeaderboard(gameId);
    },
    error: function(errorData) {
      console.log(errorData);
    }
  });
}

function checkGoal(highScore){
  steps += 0.01;
  let currentTime = new Date();
  timeSpent += (currentTime - timeStart) * speedSlider.value();
  timeStart = currentTime;
  if (!objectiveReached && steps >= objective.steps){
    sendScore(highScore, 1);
    objectiveReached = true;
  }
}

function retrieveLeaderboard(gameId){
  $.ajax({
    type: 'GET',
    url: apiUrl + '/api/leaderboard/' + gameId,
    beforeSend: function(){
    },
    success: function(jsonData) {
      fillLeaderboard(jsonData.msg);
    },
    error: function(errorData) {
      console.log(errorData);
    }
  });
}

function fillLeaderboard(leaderboardData){
  $('#leaderboardTable').html('');
  leaderboardData.forEach(leaderboardEntry => {
    $('#leaderboardTable').append(`<tr>
      <td>${leaderboardEntry.name}</td>
      <td>${leaderboardEntry.score}</td>
      <td>${leaderboardEntry.time}</td>
    </tr>`);
  });
}