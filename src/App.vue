<template>
  <v-app style="background-color: #323b4b;">
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
</script>
