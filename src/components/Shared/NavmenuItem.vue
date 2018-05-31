
<template>
  <v-list-tile>
    <v-list-tile-action>
      <v-icon>contact_mail</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title><router-link to="/snake">Snake</router-link></v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>

export default {
  name: "NavmenuItem"
};
</script>