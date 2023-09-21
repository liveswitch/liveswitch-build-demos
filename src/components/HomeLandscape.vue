<template>
  <div style="display: flex; flex-flow: row wrap; justify-content: center;">
    <div style="background-color: ghostwhite; border-radius: 5px; margin: 10px;width: 310px; display: flex; flex-flow: column wrap; padding: 5px 10px 10px 10px;">
      <div class="row">
        <v-text-field
          label="Display Name"
          style="width:225px;"
          class="margin short input"
          hide-details="auto"></v-text-field>
      </div>
      <div class="row">
        <v-text-field 
          label="Channel ID" 
          style="width:225px;" 
          class="margin short input" 
          hide-details="auto"></v-text-field>
      </div>
      <div class="row">
        <v-select
          label="Camera"
          style="width:225px;"
          class="margin short input"
          hide-details="auto"
        ></v-select>
        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px; height: 36px; width: 36px; margin-top: 15px; margin-bottom: 0px;">
          <i class="center icon-video"/>
        </v-btn>
      </div>
      <div class="row">
        <v-select
          label="Microphone"
          style="width:225px;"
          class="margin short input"
          hide-details="auto"
        ></v-select>
        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px; height: 36px; width: 36px; margin-top: 15px; margin-bottom: 0px;">
          <i class="center icon-audio-mic"/>
        </v-btn>
      </div>
      <div class="row">
        <v-select
          label="Speaker"
          style="width:225px;"
          class="margin short input"
          hide-details="auto"
        ></v-select>
      </div>
    </div>
    <div class="margin">
      <div class="row" style="position: relative;">
        <div style="color: white; position: absolute; bottom: 0;" class="margin row"><h4>Preview</h4></div>
        <v-img src="@/assets/logo.svg" class="logo" style="width: 185px;flex-grow: 0;"/>
      </div>
      <Video
      :user-count=1
      ask-height="225px"
      ask-width="350px"></Video>
      <div style="display: flex; justify-content: center;">
        <v-btn class="center" style="margin-top: 12px;color: white; background-color: blue;" @click="joinCall">Join</v-btn>
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
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: auto;
  }
  .short {
    height: 42px;
  }
  .row {
    display: flex;
    margin: 5px 0px;
  }
  i.center {
    margin-left: -7px;
  }
  .input {
        flex-grow: 0;
    }
</style>