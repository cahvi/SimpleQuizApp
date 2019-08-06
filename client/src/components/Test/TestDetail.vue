<template>
  <v-container>
    <v-layout justify-center>
      <div v-if="error">
        <h1>{{ error }}</h1>
      </div>
    </v-layout>
    <h3 v-if="test" class="grey--text">{{ test.name }}</h3>
    <v-layout class="my-5" v-if="test" align-center justify-center column>
      <v-card
        width="600"
        class="grey lighten-4 my-5"
        v-for="(question, questionIndex) in test.questions"
        :key="questionIndex"
      >
        <v-card-text class="grey--text">{{ question.question }}</v-card-text>
        <v-layout align-center justify-end>
          <p class="grey--text mr-5">Attemps left: {{ attemps }}</p>
        </v-layout>
        <v-card-actions>
          <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
            <v-checkbox
              v-on:change="sendAnswer(test._id, questionIndex, answerIndex)"
              class="mx-2"
              :label="answer.answer"
            ></v-checkbox>
          </div>
          <p v-if="feedback" class="ml-5 mt-2">{{ feedback }}</p>
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
      error: null,
      attemps: 3,
      feedback: null
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
  },
  methods: {
    sendAnswer(test, question, answer) {
      TestService.sendanswer({
        test,
        question,
        answer
      })
        .then(res => {
          this.attemps--;
          this.feedback = res.data;
        })
        .catch(err => {
          this.feedback = err;
        });
    }
  }
};
</script>

<style>
</style>
