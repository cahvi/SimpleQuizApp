<template>
  <div>
    <v-layout justify-center class="mt-5">
      <h1>This is a secure page test</h1>
    </v-layout>
  </div>
</template>

<script>
import SecureService from '../services/SecureService';
export default {
  created() {
    SecureService.index();
  }
};
</script>

<style>
</style>
