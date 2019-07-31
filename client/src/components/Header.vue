<template>
  <nav>
    <v-toolbar color="black">
      <router-link tag="span" class="home mx-3" :to="{ name: 'tests' }">
        <v-toolbar-title class="white--text">Tests</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <router-link tag="button" :to="{name: 'login'}">
          <v-btn v-if="!isLoggedIn" dark text>Login</v-btn>
        </router-link>
        <router-link tag="button" :to="{name: 'register'}">
          <v-btn v-if="!isLoggedIn" dark text>Sign up</v-btn>
        </router-link>
        <v-btn v-if="user" dark text>{{user.username}}</v-btn>
        <router-link tag="button" :to="{name: 'register'}">
          <v-btn v-if="isLoggedIn" @click="logout" dark text>Logout</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
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
