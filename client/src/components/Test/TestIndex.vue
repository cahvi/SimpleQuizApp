<template>
  <v-container class="my-5">
    <v-layout justify-center>
      <div v-if="error">
        <h1>{{error}}</h1>
      </div>
    </v-layout>
    <v-layout justify-center align-center column>
      <v-flex xs12 md6 lg6 v-for="(test, i) in tests" :key="test._id">
        <v-toolbar class="pa-5 mb-4" color="grey lighten-4" width="600" height="150">
          <v-layout column>
            <v-toolbar-title>{{ test.name }}</v-toolbar-title>
            <v-text-field class="mt-2" type="password" v-model="passwords[i]" label="Password"></v-text-field>

            <p v-if="feedback" class="red--text">{{ feedback }}</p>
          </v-layout>
          <v-spacer></v-spacer>
          <v-layout></v-layout>
          <v-btn @click="enter(test._id, i)">
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
      error: null,
      passwords: {},
      feedback: null
    };
  },
  mounted() {
    TestService.testindex()
      .then(res => {
        this.tests = res.data;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    enter(id, i) {
      console.log(i);
      TestService.access({
        id,
        password: this.passwords[i]
      })
        .then(res => {
          this.$router.push({ name: 'testdetail', params: { testId: id } });
        })
        .catch(err => {
          this.feedback = err.response.data.error;
          this.passwords = {};
        });
    }
  }
};
</script>

<style>
</style>
