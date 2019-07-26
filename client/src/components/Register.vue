<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <div class="signup-form">
          <v-card class="elevation-12">
            <v-toolbar dark color="blue lighten-3">
              <v-toolbar-title>Sign up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="account_box"
                  label="Username"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <p class="red--text" v-if="error">{{error}}</p>
              <v-spacer></v-spacer>

              <v-btn color="blue lighten-3" @click="signUp">Sign up</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: null,
      password: null,
      error: null
    };
  },
  methods: {
    signUp() {
      this.error = null;
      axios
        .post('http://localhost:5000/register', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          (this.username = ''), (this.password = '');
        })
        .catch(error => {
          this.error = error.response.data.error;
        });
    }
  }
};
</script>

<style scoped>
.signup-form {
  margin-top: 60px;
}
</style>
