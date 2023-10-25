<template>
  <v-img src="@/assets/logo.svg" class="logo"/>

  <div class="col center">
    <div>
      <div>
        <div class="header margin"><h2>Preview</h2></div>
      </div>
      <div class="basic-flex" :class="store.state.localMedia ? '' : 'empty-video'">
        <Video 
        :userCount=1
        class="margin"
        :local-video="store.state.localMedia"></Video>
      </div>
    </div>
    <div>
      <div>
        <div class="header margin"><h2>Setup</h2></div>
      </div>

      <v-form class="settings-menu margin" @submit.prevent="joinCall">
        <div class="row">
          <v-text-field
            label="Display Name"
            class="margin input liveswitch"
            hide-details="auto"
            :rules="[(v: any) => !!v || 'This field is Required']"
            v-model="displayName"></v-text-field>
        </div>
        <div class="row">
          <v-text-field
            label="Channel ID"
            class="margin input liveswitch"
            hide-details="auto"
            :rules="[(v: any) => !!v || 'This field is Required']"
            v-model="channelId"></v-text-field>
        </div>
        <div class="row">
          <v-select
            label="Camera"
            class="margin input liveswitch"
            hide-details="auto"
            :items="store.state.cameraList"
            item-title="name"
            item-value="id"
            v-model="store.state.activeVideoDevice"
            @update:model-value="changeCamera"></v-select>
          <v-btn class="margin button liveswitch"
            icon
            @click="store.commit('toggleLocalVideoMute')">
              <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
          </v-btn>
        </div>
        <div class="row">
          <v-select
            label="Microphone"
            class="margin input liveswitch"
            hide-details="auto"
            :items="store.state.microphoneList"
            item-title="name"
            item-value="id"
            v-model="store.state.activeAudioDevice"
            @update:model-value="changeMicrophone"></v-select>
          <v-btn class="margin button liveswitch"
            icon
            @click="store.commit('toggleLocalAudioMute')">
              <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
          </v-btn>
        </div>
        <div class="row">
          <v-select
            label="Speaker"
            class="margin input liveswitch"
            hide-details="auto"
            :items="store.state.speakerList"
            item-title="name"
            item-value="id"
            v-model="store.state.activeSpeakerDevice"
            @update:model-value="changeSpeaker"></v-select>
        </div>
        <div class="row">
          <v-btn class="margin center join-button liveswitch custom" type="submit">Join</v-btn>
        </div>
      </v-form>
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

  const emit = defineEmits(['joinCall', 'changeCamera', 'changeMicrophone', 'changeSpeaker']);

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
</script>