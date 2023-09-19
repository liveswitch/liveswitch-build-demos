<template>
    <InCall v-if="!mobile"/>
    <InCallPortrait v-else-if="isPortrait"/>
    <InCallLandscape v-else/>
  </template>
  
  <script lang="ts" setup>
    import InCall from '@/components/InCall.vue'
    import InCallPortrait from '@/components/InCallPortrait.vue'
    import InCallLandscape from '@/components/InCallLandscape.vue'

    import { Ref,ref } from "vue";
    import { useDisplay } from 'vuetify'
  
    // Destructure only the keys you want to use
    const { mobile } = useDisplay();
    const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);
  </script>
  