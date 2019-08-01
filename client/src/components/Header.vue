<template>
  <nav>
    <v-app-bar height="50" app color="grey lighten-4">
      <router-link tag="span" class="home mx-3" :to="{ name: 'tests' }">
        <v-toolbar-title>Tests</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <router-link tag="button" :to="{name: 'login'}">
          <v-btn v-if="!isLoggedIn" text>Login</v-btn>
        </router-link>
        <router-link tag="button" :to="{name: 'register'}">
          <v-btn v-if="!isLoggedIn" text>Sign up</v-btn>
        </router-link>
        <v-btn v-if="user" text>{{user.username}}</v-btn>
        <router-link tag="button" :to="{name: 'register'}">
          <v-btn v-if="isLoggedIn" @click="logout" text>Logout</v-btn>
        </router-link>
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
    }
  }
};
</script>

<style>
.home {
  cursor: pointer;
}
</style>
