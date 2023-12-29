<template>
  <Home v-if="!mobile" :store="store" :display-name="displayName" :channel-id="channelId" @change-camera="updateCamera" @change-microphone="updateMicrophone" @change-speaker="updateSpeaker" @joinCall="joinCall" @changeChannel="updateChannel"/>
  <HomePortrait v-else-if="isPortrait" :store="store" :display-name="displayName" :channel-id="channelId" @change-camera="updateCamera" @change-microphone="updateMicrophone" @change-speaker="updateSpeaker" @joinCall="joinCall" @changeChannel="updateChannel"/>
  <HomeLandscape v-else :store="store" :display-name="displayName" :channel-id="channelId" @change-camera="updateCamera" @change-microphone="updateMicrophone" @change-speaker="updateSpeaker" @joinCall="joinCall" @changeChannel="updateChannel"/>
</template>

<script lang="ts" setup>
  import Home from '@/components/Home.vue'
  import HomePortrait from '@/components/HomePortrait.vue'
  import HomeLandscape from '@/components/HomeLandscape.vue'
  import { useDisplay } from 'vuetify'
  import { useRouter, useRoute } from "vue-router";
  import liveSwitch from 'fm.liveswitch';
  import { Ref, onMounted, ref, watch, inject } from "vue";
  import { useStore } from 'vuex';
  import * as mnemonicId from 'mnemonic-id'

  const liveSwitchPlugin: any = inject('liveSwitch');

  // setup some global access
  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  // setup reactive variable for local media
  let localMedia : Ref<liveSwitch.LocalMedia | undefined> = ref(undefined);

  // setup input values
  const displayName : Ref<string> = ref(mnemonicId.createNameId());
  const channelId : Ref<string> = ref("");

  if (route.params.channelId) {
    channelId.value = route.params.channelId as string;
  }
  else {
    channelId.value = Math.floor(Math.random() * 100000).toString()
  }

  updateURL();
    
  watch(channelId, updateURL);

  function updateChannel(newChannelId: string) {
    channelId.value = newChannelId
  }
  function updateURL() {
    router.push({name: 'Lobby', params: { channelId: channelId.value}})
  }

  function updateCamera (deviceId: string) {
    store.commit('changeCamera', deviceId)
  }
  function updateMicrophone (deviceId: string) {
    store.commit('changeMicrophone', deviceId)
  }
  function updateSpeaker (deviceId: string) {
    store.commit('setActiveSpeakerDevice', deviceId)
  }

  // handler that validates form and switches to inCall screen
  async function joinCall(this: any, event: any) {
    // wait for form validation to complete
    const results = await event
    // only proceed if validation passes
    if (!results.valid) {  
      return;
    }
    // update global store with inputs
    store.commit('setChannelId', channelId.value)
    store.commit('setDisplayName', displayName.value)
    // navigate to inCall screen
    router.push({name: 'InCall', params: { channelId: channelId.value}})
  }

  onMounted(async () => {
    const media = await liveSwitchPlugin.startLocalMedia();
    localMedia.value = media;
    store.commit('setLocalMedia', media)
    onLocalMediaReady(media);
    
  })

  const onLocalMediaReady = function (media: liveSwitch.LocalMedia) {
    store.commit('setLocalMedia', media)

    store.commit('populateCameraList')
    store.commit('populateMicrophoneList')
    store.commit('populateSpeakerList', new liveSwitch.RemoteMedia(true,true))

    store.commit('setActiveVideoDevice', media.getVideoSourceInput().getId());
    store.commit('setActiveAudioDevice', media.getAudioSourceInput().getId());

    
    store.commit('setVideoMuted', media.getVideoMuted());
    store.commit('setAudioMuted', media.getAudioMuted());
  }

  // Destructure only the keys you want to use
  const { mobile } = useDisplay();
  const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);
</script>
