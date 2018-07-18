<template>
  <v-content>
    <v-container 
      fluid 
      fill-height>
      <v-layout
        justify-center
        align-center
      >
        <v-flex 
          text-xs-center 
          sm10
          pa-5>
          <v-card>
            <h1>Welcome to NEAT Builder!</h1>
          </v-card>
          <v-card>
            <h1>Here you will setup your AI to learn how to play some iconic games.</h1>
            <p>At the moment we have the NEAT (Neuroevolution of augmenting topologies) technique to be used. </p>
            <p>To play you have to specify the following parameters</p>
            <ul>
              <li>
                Inputs - How many information from the game you want to send to your AI. 
                Each input is a formula type. 
                Imagine the Chrome's running dinossaur game, 
                there you could have the dinossaur object with its X and Y position (dinossaur.position.x and dinossaur.position.y)
                 and the next obstacle object with its X and Y position (obstacle.position.x and obstacle.position.y).
                Your first input in this case could be dinossaur.position.x - obstacle.position.x, while the second input could be only the obstacle.position.y. 
                This will be turned into values that will be sent to your AI each tick of the game, with no explanation whatsoever of what those values means. 
                Your AI's job is to figure out what those values mean and which action it should do based on those values. 
              </li>
              <li>
                Hidden Layers - This specifies how many neurons you want to have between your inputs and your outputs.
                Those neurons will help your AI to indetify how relevant your input value is to choose an action.
                With a high number of hidden layers your AI tends to become better, however hidden layers costs processing time
                and that is where you have to balance and choose the best cost x benefit amount.
                To a better understanding we highly suggest that you take a quick look at some more detailed Neural Network explanation
              </li>
              <li>
                Learning rate - This, in super simple words, tells your AI how much what it learned from the previous experience matters.
                Your job here is to find a good value that will make your AI learn at a good pace without going crazy with wrong experiments.
              </li>
              <li>
                Learning rate - This, in super simple words, tells your AI how much what it learned from the previous experience matters.
                Your job here is to find a good value that will make your AI learn at a good pace without going crazy with wrong experiments.
              </li>
              <li>
                Species per generation - Self explanied, chooses how much species each generation of your AI will have. 
                Have a high amount is good, because you will have more experimentation, but it will make the processing be more heavy and consequently run the game slower.
              </li>
              <li>
                Mutation rate - Each time all your generation dies we pick the best species and make a new generation based on them.
                This values defines how much mutation those selected best agents will suffer while creating the new generation.
              </li>
            </ul>
            Those are really simple explanations, we recommend for you to take a quick look at Neural Networks and Genetic Algorithms to have a better understanding about all these parameters.
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
