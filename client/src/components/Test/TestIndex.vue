<template>
  <v-container class="my-5">
    <v-layout justify-center>
      <div v-if="error">
        <h1>{{error}}</h1>
        <h1>Please log in to continue</h1>
      </div>
    </v-layout>
    <v-layout justify-center align-center column>
      <v-flex xs12 md6 lg6 v-for="test in tests" :key="test._id">
        <v-toolbar color="grey lighten-4" width="400">
          <v-toolbar-title>{{ test.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn :to="{ name:  'testdetail' , params: {
            testId: test._id
          }}">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TestService from '@/services/TestService';
export default {
  data() {
    return {
      tests: [],
      error: null
    };
  },
  mounted() {
    TestService.testindex()
      .then(res => {
        console.log(res.data);
        this.tests = res.data;
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style>
</style>
