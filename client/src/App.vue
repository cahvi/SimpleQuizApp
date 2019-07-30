<template>
  <v-app class="grey lighten-4">
    <Header />
    <v-content class="ma-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';
export default {
  name: 'App',
  components: {
    Header
  },

  data: () => ({})
};
</script>
