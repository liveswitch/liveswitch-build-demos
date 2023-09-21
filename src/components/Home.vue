<template>
  <v-img src="@/assets/logo.svg" class="logo"/>
  
  <v-container>
    <v-row class="center">
      <v-col style="flex-grow: 0;">
        <v-row>
          <div style="color: white; width: fit-content;float: left;" class="margin"><h2>Preview</h2></div>
        </v-row>
        <v-row style="border-radius: 5px; width: fit-content;float: right; position: relative;">
          <v-img height="417px" width="627px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0; border-radius: 15px;"/>
          <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 627px; height: fit-content; border-radius: 0 0 15px 15px;">
            <div class="center">
              <i class="icon-video margin" style="color: white; font-size: 40px;"/>
              <i class="icon-audio-mic margin" style="color: white; font-size: 40px;"/>
          </div>
          </span>
        </v-row>
      </v-col>
      <v-col style="flex-grow: 0;">
        <v-row>
          <div style="color: white;" class="margin"><h2>Setup</h2></div>
        </v-row>
        <v-row>
          <v-col style="width: 375px;background-color: ghostwhite; border-radius: 5px;">
            <v-row>
              <v-text-field label="Display Name" style="width:275px; flex: 0 1 auto;" class="margin" hide-details="auto"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="Channel ID" style="width:275px; flex: 0 1 auto;" class="margin" hide-details="auto"></v-text-field>
            </v-row>
            <v-row>
              <v-select
                label="Camera"
                style="width:275px; flex: 0 1 auto;"
                class="margin"
                hide-details="auto"
              ></v-select>
              <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;">
                <i class="center icon-video"/>
              </v-btn>
            </v-row>
            <v-row>
            <v-select
              label="Microphone"
              style="width:275px; flex: 0 1 auto;"
              class="margin"
              hide-details="auto"
            ></v-select>
            <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;">
              <i class="center icon-audio-mic"/>
            </v-btn>
            </v-row>
            <v-row>
              <v-select
                label="Speaker"
                style="width:275px; flex: 0 1 auto;"
                class="margin"
                hide-details="auto"
              ></v-select>
            </v-row>
            <v-row>
              <v-btn class="margin center" style="color: white; background-color: blue;" @click="joinCall">Join</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import "../assets/css/liveswitch.css"
  import { useRouter } from "vue-router";

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
</style>