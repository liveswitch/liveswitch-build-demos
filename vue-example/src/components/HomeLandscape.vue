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
          v-model="channelId"
          @update:model-value="changeChannel"></v-text-field>
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
          @update:model-value="changeCamera"
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
          @update:model-value="changeMicrophone"
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
          @update:model-value="changeSpeaker"
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
      :local-video="store.state.localMedia"></Video>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { toRef } from "vue";
  import Video from "./Video.vue";

  const props = defineProps({
    store: {
      type: Object,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    channelId: {
      type: String,
      required: true
    }
  });
  const displayName = toRef(props, 'displayName');
  const channelId = toRef(props, 'channelId');

  const emit = defineEmits(['joinCall', 'changeCamera', 'changeMicrophone', 'changeSpeaker', 'changeChannel']);

  const joinCall = (event: any) => {
    emit('joinCall', event);
  }
  const changeCamera = (deviceId: String) => {
    emit('changeCamera', deviceId);
  }
  const changeMicrophone = (deviceId: String) => {
    emit('changeMicrophone', deviceId);
  }
  const changeSpeaker = (deviceId: String) => {
    emit('changeSpeaker', deviceId);
  }
  const changeChannel = (channelId: String) => {
    emit('changeChannel', channelId);
  }
</script>
