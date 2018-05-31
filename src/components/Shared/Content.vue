<template>
  <v-app>
    <main>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <v-tooltip left>
              <v-btn icon large :href="source" target="_blank" slot="activator">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
              <h1>AAHH</h1>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    </main>
  </v-app>
</template>
