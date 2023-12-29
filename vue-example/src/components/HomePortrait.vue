<template>
  <v-img src="@/assets/logo.svg" class="logo"/>
  <div class="col">
      <div class="col">
        <div class="margin header">
          <h3>Preview</h3>
        </div>
        <div class="basic-flex" :class="store.state.localMedia ? '' : 'empty-video'">
          <Video
            :userCount=1
            askHeight="275px"
            askWidth="300px"
            :local-video="store.state.localMedia"
            ></Video>
        </div>
      </div>
      <v-form class="settings-menu" @submit.prevent="joinCall">
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
        <div class="row join-row">
          <v-btn class="margin center join-button liveswitch" type="submit">Join</v-btn>
        </div>
      </v-form>
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