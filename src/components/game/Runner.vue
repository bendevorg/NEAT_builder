<template>
  <div class="row">
    <div class="col-md-6" id="canvascontainer"></div>
    <app-info/>
  </div>
</template>

<script>
import Info from './Info.vue';
import Agent from '../../games/runner/agent.js';
import GA from '../../utils/GeneticAlgorithm/GeneticAlgorithm.js'

export default {
  name: "Runner",
  data(){
    return {
      script: null,
      game: null,
      genetic: null,
      neuralNetwork: null
    };
  },
  props: {
    msg: String
  },
  computed: {
  },
  components: {
    AppInfo: Info
  },
  mounted() {

    let activeAgents = [];
    let allAgents = [];

    this.game = this.$store.getters.gameParameters;
    this.genetic = this.$store.getters.geneticParameters;
    this.neuralNetwork = this.$store.getters.neuralNetworkParameters;
    this.script = pFive => {
      pFive.setup = () => {
        let canvas = pFive.createCanvas(this.game.width, this.game.height);
        canvas.parent('canvascontainer');

        // Access the interface elements
        let speedSlider = pFive.select('#speedSlider');
        let speedSpan = pFive.select('#speed');
        let highScoreSpan = pFive.select('#hs');
        let allTimeHighScoreSpan = pFive.select('#ahs');
        let stepsSpan = pFive.select('#stepsCount');
        let timeSpentSpan = pFive.select('#timeSpent');

        // Create a population
        for (let i = 0; i < this.genetic.population; i++) {
          let agent = new Agent();
          activeAgents[i] = agent;
          allAgents[i] = agent;
        }
        GA.nextGeneration(activeAgents, allAgents);
      }

      pFive.draw = () => {
        pFive.background(0);

        // Should we speed up cycles per frame
        let cycles = speedSlider.value();
        speedSpan.html(cycles);

        // How many times to advance the pFive
        for (let n = 0; n < cycles; n++) {

          // Show all the pipes
          for (let i = blocks.length - 1; i >= 0; i--) {
            blocks[i].update();
            if (blocks[i].offscreen()) {
              blocks.splice(i, 1);
            }
          }

          // Running all the active agents
          for (let i = activeAgents.length - 1; i >= 0; i--) {
            let agent = activeAgents[i];
            // Agent uses its brain!
            agent.think(blocks);
            agent.update();

            // Check all the blocks
            for (let j = 0; j < blocks.length; j++) {
              // It's hit a pipe
              if (blocks[j].hits(activeAgents[i])) {
                // Remove this agent
                activeAgents.splice(i, 1);
                break;
              }
            }

          }

          // Add a new pipe every so often
          if (counter % 75 == 0) {
            blocks.push(new Block());
          }
          counter++;

          // Update High score
          updateHighscore();

          //  Check for leadboard goal
          checkGoal(highScore, gameId);
        }

        // Update DOM Elements
        highScoreSpan.html(generationHighScore);
        allTimeHighScoreSpan.html(highScore);
        stepsSpan.html(Math.floor(steps));
        timeSpentSpan.html(Math.floor(timeSpent/1000));

        // Draw everything!
        for (let i = 0; i < blocks.length; i++) {
          blocks[i].show(pFive);
        }

        for (let i = 0; i < activeAgents.length; i++) {
          activeAgents[i].show(pFive);
        }
        // If we're out of agents go to the next generation
        if (activeAgents.length == 0) {
          resetGame();
          GA.nextGeneration(activeAgents, allAgents);
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
