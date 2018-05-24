<template>
  <div>
    <input type="text" v-for="index in getInputLayers" :key="index" placeholder="Type your input variable"/>
  </div>
</template>

<script>
export default {
  name: "VariableInput",
  props: {
    msg: String
  },
  computed: {
    getInputLayers() {
      return parseInt(this.$store.getters.getInputLayers);
    }
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
