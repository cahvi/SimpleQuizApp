<template>
  <v-layout justify-center>
    <v-card width="600">
      <v-card-title primary-title>
        <div>
          <div class="headline">New test</div>
        </div>
      </v-card-title>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field v-model="test.name" label="Title"></v-text-field>
            <v-text-field v-model="test.password" label="Password"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-subheader>Questions</v-subheader>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field v-model="test.questions.question" label="New question"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-layout>
        <v-btn text class="mt-4">Add Question</v-btn>
      </v-layout>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text to="/tests">Cancel</v-btn>
        <v-btn text @click="addTest">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import TestService from '@/services/TestService';
export default {
  data() {
    return {
      test: {
        name: null,
        password: null,
        questions: [
          {
            question: null,
            userpoints: 0,
            feedback: '',
            isDone: false,
            attemps: 3,
            points: 3,
            questionType: null,
            answers: [
              {
                answer: String,
                checked: Boolean,
                correct: Boolean
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    addTest() {
      TestService.add({
        name: this.test.name,
        password: this.test.password,
        questions: [
          {
            question: this.test.questions.question,
            userpoints: 0,
            feedback: '',
            isDone: false,
            attemps: 3,
            points: 3
          }
        ]
      }).then(res => {
        console.log(res.data);
        //this.$router.push({ name: 'tests' });
      });
    }
  }
};
</script>
