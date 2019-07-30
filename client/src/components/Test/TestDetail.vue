<template>
  <v-container>
    <v-layout justify-center>
      <div v-if="error">
        <h1>{{ error }}</h1>
        <h1>Please log in to continue</h1>
      </div>

      <h1 v-if="test">Do {{ test.name }}</h1>
    </v-layout>
  </v-container>
</template>

<script>
import TestService from '@/services/TestService';
export default {
  data() {
    return {
      test: null,
      error: null
    };
  },
  mounted() {
    const testId = this.$route.params.testId;
    TestService.testdetail(testId)
      .then(res => {
        this.test = res.data;
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style>
</style>
