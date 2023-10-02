<template>
  <div class="container">
    <v-form class="settings-menu" @submit="joinCall" @submit.prevent="joinCall">
      <div class="row">
        <v-text-field
          label="Display Name"
          class="margin short input"
          hide-details="auto"
          :rules="[v => !!v || 'This field is Required']"
          v-model="displayName"></v-text-field>
      </div>
      <div class="row">
        <v-text-field 
          label="Channel ID" 
          class="margin short input" 
          hide-details="auto"
          :rules="[v => !!v || 'This field is Required']"
          v-model="channelId"></v-text-field>
      </div>
      <div class="row">
        <v-select
          label="Camera"
          class="margin short input"
          hide-details="auto"
          :items="store.state.cameraList"
          item-title="name"
          item-value="id"
          v-model="store.state.activeVideoDevice"
          @update:model-value="store.commit('changeCamera')"
        ></v-select>
        <v-btn
        class="margin button"
        icon
        @click="store.commit('toggleLocalVideoMute')">
          <i class="center icon-video"/>
        </v-btn>
      </div>
      <div class="row">
        <v-select
          label="Microphone"
          class="margin short input"
          hide-details="auto"
          :items="store.state.microphoneList"
          item-title="name"
          item-value="id"
          v-model="store.state.activeAudioDevice"
          @update:model-value="store.commit('changeMicrophone')"
        ></v-select>
        <v-btn
        class="margin button"
        icon
        @click="store.commit('toggleLocalAudioMute')">
          <i class="center icon-audio-mic"/>
        </v-btn>
      </div>
      <div class="row-center">
        <v-btn class="center join-button" type="submit">Join</v-btn>
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
  import "../assets/css/liveswitch.css";
  import { useRouter } from "vue-router";
  import Video from "./Video.vue";
  import ls from 'fm.liveswitch';
  import { Ref, onMounted, ref } from "vue";
  import { useStore } from 'vuex';

  // setup some global access
  const store = useStore();
  const router = useRouter();

  // setup reactive variable for local media
  let localMedia : Ref<ls.LocalMedia | undefined> = ref(undefined);

  // setup input values
  const displayName : Ref<String> = ref("");
  const channelId : Ref<String> = ref("");

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
    const media = new ls.LocalMedia(true, true)
    await media.start()
    onLocalMediaReady(media)
    
  })
  const onLocalMediaReady = function (media: ls.LocalMedia) {
    localMedia.value = media;

    store.commit('setLocalMedia', media)

    store.commit('populateCameraList')
    store.commit('populateMicrophoneList')

    store.commit('setActiveVideoDevice', media.getVideoSourceInput().getId());
    store.commit('setActiveAudioDevice', media.getAudioSourceInput().getId());

    
    store.commit('setVideoMuted', media.getVideoMuted());
    store.commit('setAudioMuted', media.getAudioMuted());
  }
</script>

<style scoped>
  .margin {
    margin: 5px 10px 5px 10px;
  }
  .container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .header {
    color: white;
    position: absolute;
    bottom: 0;
  }
  .settings-menu {
    background-color: ghostwhite;
    border-radius: 5px;
    margin: 10px;
    width: 310px;
    display: flex;
    flex-flow: column wrap;
    padding: 5px 10px 10px 10px;
  }
  .button {
    color: white;
    background-color: rgba(3,1,28,.8);
    font-size: 24px;
    height: 36px;
    width: 36px;
    margin-top: 15px;
    margin-bottom: 0px;
  }
  .join-button {
    margin-top: 12px;
    color: white;
    background-color: blue;
  }
  div.center {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  button.center {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  .logo {
    width: 185px;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: auto;
    flex-grow: 0;
  }
  .short {
    height: 42px;
  }
  .row {
    display: flex;
    margin: 5px 0px;
  }
  .row-center {
    display: flex;
    margin: 5px 0px;
  }
  i.center {
    margin-left: -7px;
  }
  .input {
    flex-grow: 0;
    width:225px;
  }
  .relative {
    position: relative;
  }
</style>