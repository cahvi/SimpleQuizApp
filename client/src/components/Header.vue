<template>
  <nav>
    <v-app-bar height="50" app color="grey lighten-4">
      <router-link tag="span" class="home mx-3" :to="{ name: 'tests' }">
        <v-toolbar-title>Tests</v-toolbar-title>
      </router-link>
      <router-link
        tag="span"
        v-if="user && user.role == 'admin'"
        class="home mx-3"
        :to="{ name: 'createtest' }"
      >
        <v-toolbar-title>Add test</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!isLoggedIn" text :to="{ name: 'login' }">Login</v-btn>
        <v-btn v-if="!isLoggedIn" text :to="{ name: 'register' }">Register</v-btn>
        <v-btn text v-if="isLoggedIn" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['isLoggedIn', 'user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('setUser', null);
      window.localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style>
.home {
  cursor: pointer;
}
</style>
