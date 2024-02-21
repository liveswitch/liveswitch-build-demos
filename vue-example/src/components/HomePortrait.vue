<template>
  <v-img src="@/assets/logo.svg" class="logo"/>
  <div v-if="!sessionType" class="col center">
  <v-form class="settings-menu margin" @submit.prevent="startBroadcast,watchBroadcast">
        <div class="row center">
          <v-select
            label="Session Option"
            class="margin input liveswitch"
            hide-details="auto"
            :items="sessionTypes"
            item-title="name"
            item-value="value"
            v-model="selectedSessionType"
          ></v-select>
        </div>
        <div class="row">
          <v-btn class="margin center start-broadcast-button liveswitch custom" :disabled="!selectedSessionType"  @click="startSession">Select</v-btn>
        </div>
      </v-form>
</div>
  <div v-if="sessionType === 'start-broadcast'" class="col">
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
      <v-form class="settings-menu" @submit.prevent="startBroadcast,watchBroadcast">
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
          <v-text-field
          label="Media ID"
          class="margin input liveswitch"
          hide-details="auto"
          density="compact"
          :rules="[v => !!v || 'This field is Required']"
          v-model="mediaId"
          @update:model-value="changeMediaId"></v-text-field>
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
          <v-btn class="margin center start-broadcast-button liveswitch custom" @click="startBroadcast">Start Broadcast</v-btn>
        </div>
      </v-form>
  </div>
  <div v-if="sessionType === 'watch-broadcast'" class="col">
      <div class="col">
        <div class="margin header">
          <h3>Setup</h3>
        </div>
      </div>
      <v-form class="settings-menu" @submit.prevent="startBroadcast,watchBroadcast">
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
          <v-text-field
          label="Media ID"
          class="margin input liveswitch"
          hide-details="auto"
          density="compact"
          :rules="[v => !!v || 'This field is Required']"
          v-model="mediaId"
          @update:model-value="changeMediaId"></v-text-field>
        </div>
        <div class="row join-row">
          <v-btn class="margin center watch-broadcast-button liveswitch custom" @click="(event:any) => watchBroadcast(event)">Watch Broadcast</v-btn>
        </div>
      </v-form>
  </div>
</template>

<script setup lang="ts">
  import { Ref, computed, ref, toRef } from "vue";
  import Video from "./Video.vue";
import { useStore } from "vuex";

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
    },
  });
  const displayName = toRef(props, 'displayName');
  const channelId = toRef(props, 'channelId');
  const mediaId : Ref<String> = ref(Math.floor(Math.random() * 100000).toString());
  const sessionTypes : Array<any> = [{ name: "Start Broadcast", value: "start-broadcast"}, {name: "Watch Broadcast", value: "watch-broadcast"}];
  const selectedSessionType: Ref<String> = ref(sessionTypes[0].value); 

  const emit = defineEmits(['startBroadcast','watchBroadcast','changeCamera', 'changeMicrophone', 'changeSpeaker', 'changeChannel', 'changeMediaId']);

  const sessionType = computed(() => {
    return store.state.sessionType || "";
  })

  const store = useStore();
  const startSession = () => {
    store.commit('setSessionType', selectedSessionType.value)
  }

  const startBroadcast = (event: any) => {
    emit('startBroadcast',event);
  }
  const watchBroadcast = (event: any) => {
    emit('watchBroadcast', event);
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
  const changeMediaId = (mediaId: String) => {
    store.commit('setMediaId', mediaId)
  }
  changeMediaId(mediaId.value);

</script>