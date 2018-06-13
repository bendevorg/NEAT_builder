<template>
  <v-content>
    <v-container>
      <v-flex 
        xs12 
        sm6>
       <v-card>
         <div id="neuralNetworkContainer"></div>
       </v-card>
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>

export default {
  name: 'NeuralNetwork',
  data() {
    return {
    };
  },
  computed: {
  },
  mounted() {

    //  TODO: This will come from the best agent neural network
    const neuralNetwork = this.$store.getters.neuralNetwork;
    // const inputLayers = 8;
    // const hiddenLayers = 16;
    // const outputLayers = 4;

    const width = 400;
    const height = 400;

    let inputRadius;
    let hiddenRadius;
    let outputRadius;

    let inputNeurons = [];
    let hiddenNeurons = [];
    let outputNeurons = [];

    this.script = pFive => {
      pFive.setup = () => {
        let canvas = pFive.createCanvas(width, height);
        canvas.parent('neuralNetworkContainer');

        inputRadius = Math.min(height / neuralNetwork.inputLayers, (width * 0.8) / 3);
        for (let i = 0; i < neuralNetwork.inputLayers; i++){
          inputNeurons.push({
            x: inputRadius / 2,
            y: inputRadius / 2 + inputRadius * i
          });
        }

        hiddenRadius = Math.min(height / neuralNetwork.hiddenLayers, (width * 0.8) / 3)
        for (let i = 0; i < neuralNetwork.hiddenLayers; i++){
          hiddenNeurons.push({
            x: width / 2,
            y: hiddenRadius / 2 + hiddenRadius * i
          });
        }

        outputRadius = Math.min(height / neuralNetwork.outputLayers, (width * 0.8) / 3);
        for (let i = 0; i < neuralNetwork.outputLayers; i++){
          outputNeurons.push({
            x: width - (outputRadius / 2),
            y: outputRadius / 2 + outputRadius * i
          });
        }

      }

      pFive.draw = () => {
        pFive.background(0);

        //  Draw all neurons
        inputNeurons.forEach((inputNeuron, inputIndex) => {
          pFive.fill(255);
          pFive.ellipse(inputNeuron.x, inputNeuron.y, inputRadius, inputRadius);
          hiddenNeurons.forEach((hiddenNeuron, hiddenIndex) => {
            pFive.fill(255);
            pFive.line(inputNeuron.x, inputNeuron.y, hiddenNeuron.x, hiddenNeuron.y);
            if (inputIndex === 0){
              pFive.stroke(255);
              pFive.ellipse(hiddenNeuron.x, hiddenNeuron.y, hiddenRadius, hiddenRadius);
            }
            outputNeurons.forEach(outputNeuron => {
              pFive.fill(255);
              pFive.line(hiddenNeuron.x, hiddenNeuron.y, outputNeuron.x, outputNeuron.y);
              if (hiddenIndex === 0){
                pFive.stroke(255);
                pFive.ellipse(outputNeuron.x, outputNeuron.y, outputRadius, outputRadius);
              }
            });
          });
        });
      }
    }

    new p5(this.script);

  },
  methods: {
  },
    components: {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
