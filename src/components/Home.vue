<template>
  <v-img src="@/assets/logo.svg" class="logo"/>

  <div style="display: flex; justify-content: center;">
    <div>
      <div>
        <div style="color: white; width: fit-content;" class="margin"><h2>Preview</h2></div>
      </div>
      <div style="display: flex;">
        <Video 
        :userCount=1
        style="margin: 5px;"></Video>
      </div>
    </div>
    <div>
      <div>
        <div style="color: white;" class="margin"><h2>Setup</h2></div>
      </div>

      <div style="width: 400px;background-color: ghostwhite; border-radius: 5px;padding: 10px;">
        <div>
          <v-text-field label="Display Name" style="width:290px;" class="margin input" hide-details="auto"></v-text-field>
        </div>
        <div>
          <v-text-field label="Channel ID" style="width:290px;" class="margin input" hide-details="auto"></v-text-field>
        </div>
        <div style="display: flex;">
          <v-select
            label="Camera"
            style="width:290px;"
            class="margin input"
            hide-details="auto"
          ></v-select>
          <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;">
            <i class="center icon-video"/>
          </v-btn>
        </div>
        <div style="display: flex;">
          <v-select
            label="Microphone"
            style="width:290px;"
            class="margin  input"
            hide-details="auto"
          ></v-select>
          <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;">
            <i class="center icon-audio-mic"/>
          </v-btn>
        </div>
        <div>
          <v-select
            label="Speaker"
            style="width:290px;"
            class="margin input"
            hide-details="auto"
          ></v-select>
        </div>
        <div style="display: flex; justify-content: center;">
          <v-btn class="margin center" style="color: white; background-color: blue;" @click="joinCall">Join</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import "../assets/css/liveswitch.css"
  import { useRouter } from "vue-router";
  import Video from "./Video.vue"

  const router = useRouter();

  function joinCall() {
    router.push('/inCall');
  }
</script>

<style scoped>
  .margin {
    margin: 5px 10px 5px 10px;
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
  .video-preview {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex: 1;
    background-color: #000;
    border-radius: 15px;
  }
  .input {
        flex-grow: 0;
    }
</style>