<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <div class="signup-form">
          <v-card class="grey lighten-4">
            <v-toolbar color="black lighten-5">
              <v-toolbar-title class="white--text">Login</v-toolbar-title>
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

              <v-btn color="black" dark @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
export default {
  data() {
    return {
      username: null,
      password: null,
      error: null
    };
  },
  methods: {
    login() {
      this.error = null;
      AuthenticationService.login({
        username: this.username,
        password: this.password
      })
        .then(res => {
          this.$store.dispatch('setUser', res.data.user);
          window.localStorage.setItem('token', res.data.token);
          this.$router.push({ name: 'index' });
        })
        .catch(err => {
          this.error = err.response.data.error;
        });
    }
  }
};
</script>

<style>
.signup-form {
  margin-top: 60px;
}
</style>
