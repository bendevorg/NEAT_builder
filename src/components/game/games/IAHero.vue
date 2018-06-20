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
import utils from '../../../utils/utils.js';
import song from '../../../games/IAHero/song.json';

export default {
  name: "IAHero",
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
    
    let radius = 30;
    let pixelsPerStep = 4;
    let cores = {
      0: 'RGB(67, 255, 97)',
      1: 'RGB(246, 108, 105)',
      2: 'RGB(254, 247, 107)',
      3: 'RGB(128, 206, 252)',
      4: 'RGB(226, 181, 116)',
      5: 'RGB(255, 255, 255)',
    }
    let activeNotes = [];

    let activeAgents = [];
    let allAgents = [];
    let allTimeHighScore = 0;
    let generationHighScore = 0;

    let startTime;
    let noteCounter = 0;

    this.gameCanvas = this.$store.getters.gameCanvas;
    this.genetic = this.$store.getters.genetic;
    this.neuralNetwork = this.$store.getters.neuralNetwork;

    this.script = pFive => {
      pFive.setup = () => {
        let canvas = pFive.createCanvas(400, 600);
        canvas.parent('canvascontainer');
        startTime = Date.now();
      }

      pFive.draw = () => {
        pFive.background(0);

        if ((Date.now() - startTime) / 1000 >= song[noteCounter].time){
          let type = 100 - song[noteCounter].midi;
          type = type > 5?5:type < 0?0:type;
          activeNotes.push({
            radius: radius,
            type: type,
            x: radius + (radius * (type) * 2),
            y: radius
          });
          noteCounter++;
        }

        for (let i = 0; i < activeNotes.length; i++){
          console.log(activeNotes[i].type);
          pFive.fill(cores[activeNotes[i].type]);
          pFive.ellipse(activeNotes[i].x, activeNotes[i].y, activeNotes[i].radius * 2, activeNotes[i].radius * 2);
          activeNotes[i].y += pixelsPerStep;
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
