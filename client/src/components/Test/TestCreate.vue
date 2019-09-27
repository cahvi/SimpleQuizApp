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
            <v-text-field v-model="test.name" :placeholder="newTest.name" label="Title"></v-text-field>
            <v-text-field v-model="test.password" type="password" label="Password"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-subheader>Questions</v-subheader>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item, questionIndex) in newTest.questions"
                :key="questionIndex"
              >
                <div slot="header">{{item.question}}</div>
                <v-card class="grey lighten-3 mt-3">
                  <v-container>
                    <v-layout wrap>
                      <v-flex xs10>
                        <v-text-field label="Question" v-model="item.question"></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field type="number" label="Attemps" v-model="item.attemps"></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-container>
                      <v-layout
                        wrap
                        v-for="(answer, answerIndex) in item.answers"
                        :key="answerIndex"
                      >
                        <v-flex xs10>
                          <v-checkbox
                            label="Right Answer"
                            @change="setType(questionIndex, answerIndex)"
                            v-model="answer.correct"
                            hide-details
                          ></v-checkbox>
                          <v-text-field label="Answer" v-model="answer.answer"></v-text-field>
                        </v-flex>
                        <v-flex xs2>
                          <v-btn
                            @click="removeAnswer(questionIndex, answerIndex)"
                            fab
                            dark
                            small
                            color="red"
                          >
                            <v-icon>remove</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-layout class="pl-2">
                      <v-btn
                        small
                        class="mt-4"
                        @click="addAnswer(questionIndex)"
                        color="primary"
                      >Add Answer</v-btn>
                      <v-btn
                        small
                        class="mt-4 ml-2"
                        @click="removeQuestion(questionIndex)"
                        color="red"
                        dark
                      >Remove Question</v-btn>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-flex>
        </v-layout>
      </v-container>

      <v-layout>
        <v-btn text class="mt-4" @click="addQuestion">Add Question</v-btn>
      </v-layout>

      <v-card-actions>
        <p v-if="error">{{ error }}</p>
        <v-spacer></v-spacer>
        <v-btn text>Cancel</v-btn>
        <v-btn text @click="addTest">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import TestService from '@/services/TestService';
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      test: {},
      error: null
    };
  },
  computed: {
    ...mapGetters(['newTest'])
  },
  mounted() {
    this.test = this.newTest;
  },
  methods: {
    addQuestion() {
      this.test.questions.push({
        question: 'New question',
        userpoints: 0,
        feedback: '',
        isDone: false,
        attemps: null,
        points: null,
        questionType: null,
        answers: [
          {
            answer: 'First answer',
            checked: false,
            correct: false
          },
          {
            answer: 'Second answer',
            checked: false,
            correct: false
          },
          {
            answer: 'Third answer',
            checked: false,
            correct: false
          }
        ]
      });
    },
    addAnswer(qI) {
      this.test.questions[qI].answers.push({
        answer: 'New answer!',
        checked: false,
        correct: false
      });
    },
    removeAnswer(qI, aI) {
      const question = this.test.questions[qI];
      question.answers.splice(aI, 1);
    },
    removeQuestion(qI) {
      this.test.questions.splice(qI, 1);
    },
    setType(qI, aI) {
      let arr = this.test.questions[qI].answers;
      let count = arr.reduce((a, b) => a + b.correct, 0);
      if (count > 1) {
        this.test.questions[qI].questionType = 'multi';
      } else {
        this.test.questions[qI].questionType = 'single';
      }
    },
    addTest() {
      this.test.maxpoints = this.test.questions.reduce(
        (a, b) => a + b.points,
        0
      );
      TestService.add(this.test)
        .then(() => {
          this.$router.push({ name: 'tests' });
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
