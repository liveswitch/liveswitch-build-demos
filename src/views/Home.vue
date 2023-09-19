<template>
  <Home v-if="!mobile"/>
  <HomePortrait v-else-if="isPortrait"/>
  <HomeLandscape v-else/>
</template>

<script lang="ts" setup>
  import Home from '@/components/Home.vue'
  import HomePortrait from '@/components/HomePortrait.vue'
  import HomeLandscape from '@/components/HomeLandscape.vue'
  import { Ref,ref } from "vue";
  import { useDisplay } from 'vuetify'

  // Destructure only the keys you want to use
  const { mobile } = useDisplay();
  const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);
</script>
