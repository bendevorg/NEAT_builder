
<template>
  <v-flex>
    

  <v-list-tile v-for="game in getGames" 
          :to="{path: `/games/${game.name}`}"
          :key="game.index">
    <v-list-tile-action>
      <v-icon left>label</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ game.name }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  </v-flex>

</template>
<script>
import Content from './Content';

export default {
  name: "NavmenuItem",
  components: {
    appContent: Content
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    getGames() {
      return this.$store.getters.games;
    }
  }
};
</script>