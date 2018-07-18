<template>
  <v-content>
    <v-container 
      fluid 
      fill-height>
      <v-layout
        justify-center
        align-center
        column
      >
        <v-flex 
          text-xs-center
          sm10
          pa-5>
          <v-card>
            <v-card-title>
              <h1>Welcome to NEAT Builder!</h1>
            </v-card-title>
          </v-card>
        </v-flex>

        <v-flex>
          <v-card>

            <v-card-title>
              <h2>Here, you will setup your AI to learn how to play some iconic games.</h2>
            </v-card-title>
            <v-card-text>
              <p>At the moment, we offer the NEAT (Neuroevolution of Augmenting Topologies) technique. </p>
              <p>To play, you have to specify the following parameters:</p>
              <ul>
                <li>
                  Inputs - How much information from the game you want to send to your AI. 
                  Each input is a formula type. 
                  Imagine Google Chrome's running dinosaur game.
                  There, you could have the dinosaur object with its X and Y position (dinosaur.position.x and dinosaur.position.y) 
                  and the next obstacle object with its X and Y position (obstacle.position.x and obstacle.position.y).
                  Your first input in this case could be dinosaur.position.x - obstacle.position.x, while the second input could be only the obstacle.position.y. 
                  This will be turned into values that will be sent to your AI each tick of the game, with no explanation whatsoever of what those values mean. 
                  Your AI's job is to figure out what those values mean and which action it should do based on those values. 
                </li>
                <li>
                  Hidden Layers - This specifies how many neurons you want to have between your inputs and your outputs.
                  Those neurons will help your AI to identify how relevant your input value is to choose an action.
                  With a high number of hidden layers, your AI tends to become better. However, hidden layers cost processing time
                  and that is where you have to balance and choose the best cost x benefit amount.
                  To a better understanding, we highly suggest that you take a quick look at some more detailed Neural Network explanations.
                </li>
                <li>
                  Learning rate - This, in super simple words, tells your AI how much the knowledge of previous experience matters.
                  Your job here is to find a good value that will make your AI learn at a good pace without going crazy with wrong experiments.
                </li>
                <li>
                  Species per generation - Self explained, chooses how many species each generation of your AI will have. 
                  Having a high amount is good, because you will have more experimentation, but it will make the processing be more heavy and consequently run the game slower.
                </li>
                <li>
                  Mutation rate - Each generation, when all of your species dies, we pick the best species and make a new generation based on them.
                  This values defines how much mutation those selected best agents will suffer while creating the new generation.
                </li>
              </ul>
              <p>
                Those are really simple explanations, we recommend you to take a quick look at Neural Networks and Genetic Algorithms to have a better understanding about all these parameters.
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
