<template>
  <div class="row">
    <v-form class="settings-menu" @submit="joinCall" @submit.prevent="joinCall">
      <div class="row liveswitch">
        <v-text-field
          label="Display Name"
          class="margin input liveswitch"
          hide-details="auto"
          density="compact"
          :rules="[v => !!v || 'This field is Required']"
          v-model="displayName"></v-text-field>
      </div>
      <div class="row liveswitch">
        <v-text-field 
          label="Channel ID" 
          class="margin input liveswitch"
          hide-details="auto"
          density="compact"
          :rules="[v => !!v || 'This field is Required']"
          v-model="channelId"></v-text-field>
      </div>
      <div class="row liveswitch">
        <v-select
          label="Camera"
          class="margin input liveswitch"
          hide-details="auto"
          density="compact"
          :items="store.state.cameraList"
          item-title="name"
          item-value="id"
          v-model="store.state.activeVideoDevice"
          @update:model-value="updateCamera"
        ></v-select>
        <v-btn
        class="margin button liveswitch"
        icon
        @click="store.commit('toggleLocalVideoMute')">
          <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
        </v-btn>
      </div>
      <div class="row liveswitch">
        <v-select
          label="Microphone"
          class="margin input liveswitch"
          hide-details="auto"
          density="compact"
          :items="store.state.microphoneList"
          item-title="name"
          item-value="id"
          v-model="store.state.activeAudioDevice"
          @update:model-value="updateMicrophone"
        ></v-select>
        <v-btn
        class="margin button liveswitch"
        icon
        @click="store.commit('toggleLocalAudioMute')">
          <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
        </v-btn>
      </div>
      <div class="row liveswitch">
        <v-select
          label="Speaker"
          class="margin input liveswitch"
          hide-details="auto"
          density="compact"
          :items="store.state.speakerList"
          item-title="name"
          item-value="id"
          v-model="store.state.activeSpeakerDevice"
          @update:model-value="updateSpeaker"
        ></v-select>
      </div>
      <div class="row-center">
        <v-btn class="center join-button liveswitch" type="submit">Join</v-btn>
      </div>
    </v-form>
    <div class="margin">
      <div class="row relative">
        <div class="margin row header"><h4>Preview</h4></div>
        <v-img src="@/assets/logo.svg" class="logo"/>
      </div>
      <Video
      :user-count=1
      ask-height="250px"
      ask-width="350px"
      :local-video="localMedia"></Video>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from "vue-router";
    import Video from "./Video.vue";
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
      router.push('/inCall');
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
</script>
