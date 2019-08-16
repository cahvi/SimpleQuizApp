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
        :disabled="question.isDone || question.attemps == 0"
      >
        <v-card-text class="grey--text">{{ question.question }}</v-card-text>

        <v-layout align-center justify-end>
          <p
            v-if="getTest.questions[questionIndex].userpoints != null"
            class="grey--text mr-5"
          >{{getTest.questions[questionIndex].userpoints + '/' + getTest.questions[questionIndex].points + 'p'}}</p>
          <p v-else class="grey--text mr-5">{{'/' + getTest.questions[questionIndex].points + 'p'}}</p>
        </v-layout>
        <v-layout align-center justify-end>
          <p
            class="grey--text mr-5"
            v-if="question.attemps >= 0"
          >Attemps left: {{ getTest.questions[questionIndex].attemps }}</p>
          <p v-else class="grey--text mr-5">Attemps left: 3</p>
        </v-layout>
        <!-- <v-layout align-center justify-end>
          <p
            class="grey--text mr-5"
          >Total score: {{getTest.questions[questionIndex].userpoints + '/' + getTest.maxpoints }}</p>
        </v-layout>-->

        <v-card-actions>
          <v-layout row wrap>
            <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
              <v-checkbox
                v-if="getTest.questions[questionIndex].questionType == 'multi'"
                @change="sendAnswer(test._id, questionIndex, answerIndex)"
                class="mx-2"
                :label="answer.answer"
                :readonly="answer.checked"
                v-model="getTest.questions[questionIndex].answers[answerIndex].checked"
              ></v-checkbox>

              <v-radio-group
                v-if="getTest.questions[questionIndex].questionType == 'single'"
                v-model="getTest.questions[questionIndex].option"
              >
                <v-radio
                  @change="sendAnswer(test._id, questionIndex, answerIndex)"
                  class="mx-3"
                  :label="answer.answer"
                  :value="answer.answer"
                ></v-radio>
              </v-radio-group>
            </div>
            <v-icon
              large
              class="green--text ml-5"
              v-if="question.feedback == 'Correct answer!'"
            >checkmark</v-icon>
            <v-icon class="red--text ml-5 mb-2" v-if="question.feedback == 'Wrong answer.'">error</v-icon>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-btn text>Submit!</v-btn>
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
    AuthenticationService.getprog(this.$route.params.testId)
      .then(res => {
        if (res.data._id == this.$route.params.testId) {
          this.test = res.data;
          this.$store.dispatch('setTest', this.test);
        } else {
          TestService.testdetail(this.$route.params.testId).then(response => {
            this.test = response.data;
            this.$store.dispatch('setTest', response.data);
            console.log(this.getTest);
          });
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
    }
  }
};
</script>

<style scoped>
</style>

// :color="answer.checked && answer.correct ? 'success' : (answer.checked && !answer.correct ? 'red' : '')"