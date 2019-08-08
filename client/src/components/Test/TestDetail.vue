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
        :disabled="question.isDone"
      >
        <v-card-text class="grey--text">{{ question.question }}</v-card-text>
        <v-layout align-center justify-end>
          <p
            class="grey--text mr-5"
            v-if="question.attemps >= 0"
          >Attemps left: {{ getTest.questions[questionIndex].attemps }}</p>
          <p v-else class="grey--text mr-5">Attemps left: 3</p>
        </v-layout>
        <v-card-actions>
          <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
            <v-checkbox
              @change="sendAnswer(test._id, questionIndex, answerIndex)"
              class="mx-2"
              :label="answer.answer"
              :disabled="answer.checked"
            ></v-checkbox>
          </div>
          <v-icon
            large
            class="green--text ml-5"
            v-if="question.feedback == 'Correct answer!'"
          >checkmark</v-icon>
          <v-icon class="red--text ml-5 mb-2" v-if="question.feedback == 'Wrong answer.'">error</v-icon>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import TestService from '@/services/TestService';
import AuthenticationService from '@/services/AuthenticationService';
import { mapState, mapGetters } from 'vuex';
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
        this.$store.dispatch('setTest', res.data);
      })
      .catch(err => {
        this.error = err;
      });
  },
  computed: {
    ...mapGetters(['getTest'])
  },

  methods: {
    sendAnswer(test, question, answer) {
      this.$store.dispatch('setAnswer', {
        questionIndex: question,
        answerIndex: answer
      });

      TestService.sendanswer({
        test,
        question,
        answer
      })
        .then(res => {
          this.$store.dispatch('setFeedback', {
            feedback: res.data,
            index: question
          });

          this.$store.dispatch('setQuestionAttemps', {
            attemps: this.getTest.questions[question].attemps - 1,
            index: question
          });
        })
        .catch(err => {
          console.log(err);
        });

      //TODO: save progress to user
      // AuthenticationService.progress(this.getTest);
      // AuthenticationService.prog();
    }
  }
};
</script>

<style>
</style>
