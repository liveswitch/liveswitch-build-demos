<template>
  <v-img src="@/assets/logo.svg" class="logo"/>
  
  <v-container>
    <v-row class="center">
      <v-col style="flex-grow: 0;padding-top: 0px;">
        <v-row>
          <v-col>
            <v-row>
              <div style="color: white; width: fit-content;float: left;" class="margin"><h3>Preview</h3></div>
            </v-row>
            <v-row style="border-radius: 5px;float: right; position: relative;">
              <v-img height="250px" width="300px" cover src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0; border-radius: 5px;"/>
              <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 300px; height: fit-content;">
                <div class="center">
                  <i class="icon-video margin" style="color: white; font-size: 40px;"/>
                  <i class="icon-audio-mic margin" style="color: white; font-size: 40px;"/>
              </div>
              </span>
            </v-row>
          </v-col>
        </v-row>
        <!-- controls and input -->
        <v-row>
          <v-col style="background-color: ghostwhite; border-radius: 5px; flex: 0 1 auto; margin-top: 15px;width: 300px;padding-top: 0px;">
            <v-row class="row">
              <v-text-field label="Display Name" style="width:210px; flex: 0 1 auto;" class="margin short" hide-details="auto"></v-text-field>
            </v-row>
            <v-row class="row">
              <v-text-field label="Channel ID" style="width:210px; flex: 0 1 auto;" class="margin short" hide-details="auto"></v-text-field>
            </v-row>
            <v-row class="row">
              <v-select
                label="Camera"
                style="width:210px; flex: 0 1 auto;"
                class="margin short"
                hide-details="auto"
              ></v-select>
              <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px; height: 36px; width: 36px; margin-top: 20px; margin-bottom: 0px;">
              <i class="center icon-video"/>
            </v-btn>
            </v-row>
            <v-row class="row">
            <v-select
              label="Microphone"
              style="width:210px; flex: 0 1 auto;"
              class="margin short"
              hide-details="auto"
            ></v-select>
            <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px; height: 36px; width: 36px; margin-top: 20px; margin-bottom: 0px;">
              <i class="center icon-audio-mic"/>
            </v-btn>
            </v-row>
            <v-row class="row">
              <v-select
                label="Speaker"
                style="width:210px; flex: 0 1 auto; margin-bottom: 15px;"
                class="margin short"
                hide-details="auto"
              ></v-select>
            </v-row>
          </v-col>
        </v-row>
        <v-row style="margin-top: 20px;">
          <v-btn class="margin center" style="color: white; background-color: blue;" @click="joinCall">Join</v-btn>
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
    margin-bottom: 5px;
    margin-left: auto;
  }
  .short {
    height: 36px;
  }
  div.row {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  i.center {
    margin-left: -7px;
  }
  .vcenter {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>