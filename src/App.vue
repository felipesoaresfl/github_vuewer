<template>
  <v-app>
    <v-app-bar
      min-height="50px"
      app
      color="deep-purple darken-3"
      dense
      dark
    >
      <v-btn class="ml-2" icon href="https://github.com/felipesoaresfl" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-toolbar-title>Github Vuewer</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <GithubVuewer/>
    </v-main>
  </v-app>
</template>

<script>
import GithubVuewer from './components/GithubVuewer';

export default {
  name: 'App',

  components: {
    GithubVuewer,
  },

  data: () => ({
  }),
};
</script>
