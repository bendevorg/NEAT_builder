<template>
  <div>
    <div class="row">
      <div class="col-md-6" id="canvascontainer"></div>
    </div>
    <app-info/>
  </div>
</template>

<script>
import Info from './Info.vue';
import Agent from '../../games/snake/agent.js';
import Food from '../../games/snake/food.js';
import GA from '../../utils/GeneticAlgorithm/GeneticAlgorithm.js'
import utils from '../../utils/utils.js';

export default {
  name: "Snake",
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

    let foods = [];

    let timeStart = new Date();

    let entrySent = false;

    this.gameCanvas = this.$store.getters.gameCanvas;
    this.genetic = this.$store.getters.genetic;
    this.neuralNetwork = this.$store.getters.neuralNetwork;

    this.script = pFive => {
      pFive.setup = () => {
        pFive.frameRate(10);
        let canvas = pFive.createCanvas(this.gameCanvas.width, this.gameCanvas.height);
        canvas.parent('canvascontainer');

        // Create a population
        for (let i = 0; i < this.genetic.population; i++) {
          let agent = new Agent();
          activeAgents[i] = agent;
          allAgents[i] = agent;
          foods[i] = new Food(agent.red, agent.green, agent.blue);
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

          // Running all the active agents
          for (let i = activeAgents.length - 1; i >= 0; i--) {
            let agent = activeAgents[i];
            // Agent uses its brain!
            agent.think(foods[i]);
            agent.update();
            // Check all the blocks
            if (foods[i].hits(agent)){
              foods[i] = new Food();
            }
          }

          // Update High score
          utils.updateHighScore(activeAgents);

          //  Check for leadboard goal
          if (!entrySent && utils.goalReached()){
            entrySent = true;
            let entryInfo = {
              name: this.$store.getters.playerName,
              score: parseInt(this.$store.getters.allTimeHighScore),
              time: parseInt(this.$store.getters.timeSpent)
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
        for (let i = 0; i < foods.length; i++) {
          foods[i].show(pFive);
        }

        for (let i = 0; i < activeAgents.length; i++) {
          activeAgents[i].show(pFive);
        }
        // If we're out of agents go to the next generation
        if (activeAgents.length == 0) {
          // Reset game
          foods = [];
          let {newActiveAgents, newAllAgents} = GA.nextGeneration(activeAgents, allAgents);
          activeAgents = newActiveAgents;
          allAgents = newAllAgents;
        }
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
