<template>
  <div>
    <div class="row">
      <div class="col-md-6" id="canvascontainer"></div>
    </div>
    <app-info/>
  </div>
</template>

<script>
import Info from '../info/Info.vue';
import Agent from '../../../games/flappy/agent.js';
import Pipe from '../../../games/flappy/pipe.js';
import GA from '../../../utils/GeneticAlgorithm/GeneticAlgorithm.js'
import utils from '../../../utils/utils.js';

export default {
  name: "Flappy",
  data(){
    return {
      script: null,
      gameCanvas: null,
      genetic: null,
      neuralNetwork: null
    };
  },
  props: {
    msg: String
  },
  components: {
    AppInfo: Info
  },
  mounted() {

    let activeAgents = [];
    let allAgents = [];
    let allTimeHighScore = 0;
    let generationHighScore = 0;

    let pipes = [];
    let counter = 0;
    let max = 75;
    let min = 30;
    let randomCounter = Math.floor(Math.random() * (max - min) + min);
    let timeStart = new Date();

    let entrySent = false;

    this.gameCanvas = this.$store.getters.gameCanvas;
    this.genetic = this.$store.getters.genetic;
    this.neuralNetwork = this.$store.getters.neuralNetwork;

    this.script = pFive => {
      pFive.setup = () => {
        let canvas = pFive.createCanvas(this.gameCanvas.width, this.gameCanvas.height);
        canvas.parent('canvascontainer');

        // Create a population
        for (let i = 0; i < this.genetic.population; i++) {
          let agent = new Agent();
          activeAgents[i] = agent;
          allAgents[i] = agent;
        }
        let {newActiveAgents, newAllAgents} = GA.nextGeneration(activeAgents, allAgents);
        activeAgents = newActiveAgents;
        allAgents = newAllAgents;
      }

      pFive.draw = () => {
        pFive.background(0);
        let speed = parseInt(this.$store.getters.speed);
        // How many times to advance the pFive
        for (let n = 0; n < speed; n++) {
          // Show all the pipes
          for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            if (pipes[i].offscreen()) {
              pipes.splice(i, 1);
            }
          }
          // Running all the active agents
          for (let i = activeAgents.length - 1; i >= 0; i--) {
            let agent = activeAgents[i];
            // Agent uses its brain!
            agent.think(pipes);
            agent.update();
            // Check all the pipes
            if (agent.bottomTop()) {
              activeAgents.splice(i, 1);
              agent = null;
            } else {
                for (let j = 0; j < pipes.length; j++) {
                // It's hit a pipe
                if (pipes[j].hits(activeAgents[i])) {
                  // Remove this agent
                  // TODO: Die reward comes elsewhere
                  activeAgents[i].afterAction(pipes, -1000);
                  activeAgents.splice(i, 1);
                  break;
                }
              }
            }

            if (agent !== null) {
              agent.afterAction(pipes, 1);
            }
          }

          // Add a new pipe every so often
          if (counter % 75 == 0) {
            pipes.push(new Pipe());
            randomCounter = Math.floor(Math.random() * (max - min) + min);
            counter = 0;
          }
          counter++;

          // Update High score
          utils.updateHighScore(activeAgents);

          //  Check for leadboard goal
          if (!entrySent && utils.goalReached()){
            entrySent = true;
            let entryInfo = {
              name: this.$store.getters.playerName,
              score: parseInt(this.$store.getters.allTimeHighScore),
              time: parseInt(this.$store.getters.timeSpent),
              neuralNetwork: this.$store.getters.neuralNetwork,
              genetic: this.$store.getters.genetic
            };
            utils.sendLeaderboardEntry(entryInfo);
          }
        }

        let currentTime = new Date();
        let timeSpent = parseFloat(this.$store.getters.timeSpent);
        timeSpent += ((currentTime - timeStart) * speed)/1000;
        timeStart = currentTime;

        // Update DOM Elements
        this.$store.commit('changeProgression', {
          steps: parseFloat(this.$store.getters.steps) + (0.1 * speed),
          timeSpent: timeSpent
        });

        // Draw everything!
        for (let i = 0; i < pipes.length; i++) {
          pipes[i].show(pFive);
        }

        for (let i = 0; i < activeAgents.length; i++) {
          activeAgents[i].show(pFive);
        }
        // If we're out of agents go to the next generation
        if (activeAgents.length == 0) {
          // Reset game
          counter = 0;
          pipes = [];
          let {newActiveAgents, newAllAgents} = GA.nextGeneration(activeAgents, allAgents);
          activeAgents = newActiveAgents;
          allAgents = newAllAgents;

          this.$store.commit('changeCurrentGeneration', this.$store.getters.genetic.currentGeneration + 1);
        }
        this.$store.commit('changeSpeciesAmount', activeAgents.length);
      }
    }
    new p5(this.script);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-Pipe;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
