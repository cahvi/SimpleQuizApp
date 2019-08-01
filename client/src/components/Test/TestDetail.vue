<template>
  <v-container>
    <v-layout justify-center>
      <div v-if="error">
        <h1>{{ error }}</h1>
        <!-- <h1>Please log in to continue</h1> -->
      </div>
    </v-layout>
    <h3 v-if="test" class="grey--text">{{ test.name }}</h3>
    <v-layout class="my-5" v-if="test" align-center justify-center column>
      <v-card
        width="600"
        class="grey lighten-4 my-5"
        v-for="(question, i) in test.questions"
        :key="i"
      >
        <v-card-text class="grey--text">{{ question.question }}</v-card-text>
        <v-card-actions>
          <v-radio-group v-for="(answer, i) in question.answers" :key="i" row>
            <v-radio :label="answer.answer"></v-radio>
          </v-radio-group>
          <v-spacer></v-spacer>
          <v-btn medium text class="green lighten-4 mx-4">Submit</v-btn>
        </v-card-actions>
      </v-card>
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
