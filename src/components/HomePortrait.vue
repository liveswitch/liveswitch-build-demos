<template>
  <v-img src="@/assets/logo.svg" class="logo"/>
  
  <div style="display: flex; flex-flow: column wrap; align-content: center;">
      <div style="display: flex; flex-flow: column wrap; align-content: center;">
        <div style="color: white; width: fit-content;float: left;" class="margin">
          <h3>Preview</h3>
        </div>
        <div style="display: flex;">
          <Video
            :userCount=1
            askHeight="250px"
            askWidth="300px"
            ></Video>
        </div>
      </div>
    <!-- controls and input -->
    
      <div style="background-color: ghostwhite; border-radius: 5px; margin: 10px;width: 90%;padding: 5px 10px;">
        <div class="row">
          <v-text-field label="Display Name" style="width:210px;" class="margin short input" hide-details="auto"></v-text-field>
        </div>
        <div class="row">
          <v-text-field label="Channel ID" style="width:210px;" class="margin short input" hide-details="auto"></v-text-field>
        </div>
        <div class="row">
          <v-select
            label="Camera"
            style="width:210px;"
            class="margin short input"
            hide-details="auto"
          ></v-select>
          <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px; height: 36px; width: 36px; margin-top: 20px; margin-bottom: 0px;">
            <i class="center icon-video"/>
          </v-btn>
        </div>
        <div class="row">
          <v-select
            label="Microphone"
            style="width:210px;"
            class="margin short input"
            hide-details="auto"
          ></v-select>
          <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px; height: 36px; width: 36px; margin-top: 20px; margin-bottom: 0px;">
            <i class="center icon-audio-mic"/>
          </v-btn>
        </div>
        <div class="row">
          <v-select
            label="Speaker"
            style="width:210px; margin-bottom: 15px;"
            class="margin short input"
            hide-details="auto"
          ></v-select>
        </div>
      </div>
    <div style="display: flex; justify-content: center;">
      <v-btn class="margin center" style="color: white; background-color: blue;" @click="joinCall">Join</v-btn>
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
    margin: 10px;
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
    height: 40px;
    margin-top: 5px;
  }
  .short {
    height: 36px;
  }
  div.row {
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
  }
  i.center {
    margin-left: -7px;
  }
  .input {
        flex-grow: 0;
    }
</style>