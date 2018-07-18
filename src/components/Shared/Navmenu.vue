<template>
  <div class="navmenu">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-subheader>
          Games
        </v-subheader>
        <app-navmenu-item />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed 
      app
      dark
      class="secondary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <router-link class="nav-link" to="/">
        <v-toolbar-title>
          NEAT Builder
        </v-toolbar-title>
      </router-link>
    </v-toolbar>
  </div>
</template>

<script>
import Content from './Content';
import NavmenuItem from './NavmenuItem';

export default {
  name: 'Navmenu',
  components: {
    appContent: Content,
    appNavmenuItem: NavmenuItem
  },
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    getGames() {
      return this.$store.getters.games;
    }
  }
};
</script>

<style scoped>
  .nav-link{
    text-decoration: none;
    color: #FFF;
  }
</style>