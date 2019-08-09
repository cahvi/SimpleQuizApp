<template>
  <v-container>
    <v-layout justify-center>
      <div v-if="error">
        <h1>{{ error }}</h1>
      </div>
    </v-layout>
    <h3 v-if="test" class="grey--text">{{ test.name + ' (max. points ' + test.maxpoints + ')' }}</h3>
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
              v-model="getTest.questions[questionIndex].answers[answerIndex].checked"
            ></v-checkbox>
          </div>
          <v-icon
            large
            class="green--text ml-5"
            v-if="question.feedback == 'Correct answer!'"
          >checkmark</v-icon>
          <v-icon class="red--text ml-5 mb-2" v-if="question.feedback == 'Wrong answer.'">error</v-icon>
          <v-layout justify-end>
            <p
              v-if="getTest.questions[questionIndex].userpoints != null"
              class="grey--text mr-5"
            >{{getTest.questions[questionIndex].userpoints + '/' + getTest.questions[questionIndex].points + 'p'}}</p>
            <p
              v-else
              class="grey--text mr-5"
            >{{'/' + getTest.questions[questionIndex].points + 'p'}}</p>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-btn text @click="showResult">Submit!</v-btn>
      <p
        v-if="score"
        class="grey--text mt-5"
      >You got {{ score }} points out of {{ getTest.maxpoints }}!</p>
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
      error: null,
      score: null
    };
  },
  mounted() {
    AuthenticationService.getprog(this.$route.params.testId)
      .then(res => {
        if (!res.data.length) {
          TestService.testdetail(this.$route.params.testId).then(response => {
            this.test = response.data;
            this.$store.dispatch('setTest', response.data);
          });
        } else {
          let data = res.data;
          let correctData = data[data.length - 1];
          if ((correctData._id = this.$route.params.testId)) {
            this.test = correctData;
            this.$store.dispatch('setTest', this.test);
          }
        }
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

          AuthenticationService.progress(this.getTest);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showResult() {
      let scores = this.getTest.questions.map(points => points.userpoints);
      const sum = scores.reduce((partial_sum, a) => partial_sum + a, 0);
      this.score = sum;
    }
  }
};
</script>

<style>
</style>
