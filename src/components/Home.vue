<template>
  <v-img src="@/assets/logo.svg" class="logo"/>

  <div class="col">
    <div>
      <div>
        <div class="header margin"><h2>Preview</h2></div>
      </div>
      <div class="basic-flex" :class="localMedia ? '' : 'empty-video'">
        <Video 
        :userCount=1
        class="margin"
        :local-video="localMedia"></Video>
      </div>
    </div>
    <div>
      <div>
        <div class="header margin"><h2>Setup</h2></div>
      </div>

      <v-form class="settings-menu margin" @submit="joinCall" @submit.prevent="joinCall" >
        <div class="row">
          <v-text-field
            label="Display Name"
            class="margin input"
            hide-details="auto"
            :rules="[v => !!v || 'This field is Required']"
            v-model="displayName"></v-text-field>
        </div>
        <div class="row">
          <v-text-field
            label="Channel ID"
            class="margin input"
            hide-details="auto"
            :rules="[v => !!v || 'This field is Required']"
            v-model="channelId"></v-text-field>
        </div>
        <div class="row">
          <v-select
            label="Camera"
            class="margin input"
            hide-details="auto"
            :items="cameraList"
            item-title="name"
            item-value="id"
            v-model="activeCamera"
            @update:model-value="changeCamera"
          ></v-select>
          <v-btn class="margin button"
            icon
            @click="toggleVideoMute">
            <i class="center" :class="cameraMuted ? 'icon-video-slash' : 'icon-video'"/>
          </v-btn>
        </div>
        <div class="row">
          <v-select
            label="Microphone"
            class="margin  input"
            hide-details="auto"
            :items="micList"
            item-title="name"
            item-value="id"
            v-model="activeMic"
            @update:model-value="changeMicrophone"
          ></v-select>
          <v-btn class="margin button"
            icon
            @click="toggleAudioMute">
            <i class="center" :class="micMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
          </v-btn>
        </div>
        <div class="row">
          <v-btn class="margin center join-button" type="submit">Join</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import "../assets/css/liveswitch.css"
  import { useRouter } from "vue-router";
  import Video from "./Video.vue"
  import ls from 'fm.liveswitch'
  import { Ref, onMounted, ref } from "vue";
  import { useStore } from 'vuex'

  const store = useStore();
  const router = useRouter();
  let cameraList: Ref<{name: string, id: string}[]> = ref([]);
  let micList: Ref<{name: string, id: string}[]> = ref([]);
  const activeCamera: Ref<string> = ref("");
  const activeMic: Ref<string> = ref("");
  const cameraMuted : Ref<boolean> = ref(false);
  const micMuted : Ref<boolean> = ref(false);
  let localMedia : Ref<ls.LocalMedia | undefined> = ref(undefined);

  const form : Ref<any> = ref(null);

  const displayName : Ref<String> = ref("");
  const channelId : Ref<String> = ref("");

  async function joinCall(this: any, event: any) {
    const results = await event
    
    if (!results.valid) {  
      return;
    }
    store.commit('setChannelId', channelId.value)
    store.commit('setDisplayName', displayName.value)

    router.push('/inCall');
  }

  function toggleAudioMute () {
    micMuted.value = !micMuted.value;
    if (localMedia.value) {
      localMedia.value.setAudioMuted(micMuted.value)
    }
  }

  function toggleVideoMute () {
    cameraMuted.value = !cameraMuted.value;
    if (localMedia.value) {
      localMedia.value.setVideoMuted(cameraMuted.value)
    }
  }

  function changeCamera (value: any) {
    if (localMedia.value) {
      localMedia.value.getVideoSourceInputs().then(function(inputs: any[]){
            let videoSource = inputs.find((x: ls.SourceInput)=>{return x.getId() === value})
            if (videoSource && localMedia.value) {
              localMedia.value.changeVideoSourceInput(videoSource);
            }
        })
      }
    }

    function changeMicrophone (value: any) {
      if (localMedia.value) {
        localMedia.value.getAudioSourceInputs().then(function(inputs: any[]){
            let audioSource = inputs.find((x: ls.SourceInput)=>{return x.getId() === value})
            if (audioSource && localMedia.value) {
              localMedia.value.changeAudioSourceInput(audioSource);
            }
        })
      }
    }

  onMounted(async () => {
    const media = new ls.LocalMedia(true, true)
    await media.start()
    onLocalMediaReady(media)
    
  })
  const onLocalMediaReady = function (media: ls.LocalMedia) {
    store.commit('setLocalMedia', media)
    localMedia.value = media;
    const videoContainer = document.getElementById("home") as HTMLMediaElement;
    if (videoContainer && media) {
        var layoutManager = new ls.DomLayoutManager(videoContainer);
        // layoutManager.setLocalView(media.getView());
        // videoContainer.srcObject(media.getVideoTrack())
        // debugger;
    }
    activeCamera.value = media.getVideoSourceInput().getId();
    activeMic.value = media.getAudioSourceInput().getId();
    media.getVideoSourceInputs().then(function(inputs){
        cameraList.value = inputs.map(x=>{return { name: x.getName(), id: x.getId()}})
    }).fail(function(ex){
        console.error(ex)
    });
    media.getAudioSourceInputs().then(function(inputs){
        micList.value = inputs.map(x=>{return { name: x.getName(), id: x.getId()}})
    }).fail(function(ex){
        console.error(ex)
    });
    
    cameraMuted.value = media.getVideoMuted();
    micMuted.value = media.getAudioMuted();
  }
  
</script>

<style scoped>
  .margin {
    margin: 5px 10px 5px 10px;
  }
  .basic-flex {
    display: flex;
  }
  .button {
    height: 40px;
    width: 40px;
    color: white;
    background-color: rgba(3,1,28,.8);
    font-size: 24px;
  }
  .row {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }
  .col {
    display: flex;
    justify-content: center;
  }
  .header {
    color: white;
    width: fit-content;
  }
  .empty-video {
    background-color: black;
    border-radius: 15px;
  }
  .settings-menu {
    width: 400px;
    background-color: ghostwhite;
    border-radius: 5px;
    padding: 10px;
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
    height: 67px;
    margin: 25px;
  }
  i.center {
    margin-left: -7px;
  }
  .input {
      flex-grow: 0;
      width: 290px;
  }
  .fm-video {
      width: 640px;
      height: 480px;
  }
  .join-button {
    color: white;
    background-color: blue;
  }
</style>