<template>
  <v-img src="@/assets/logo.svg" class="logo"/>
  
  <v-container>
    <v-row class="center">
      <v-col style="flex-grow: 0;">
        <v-row>
          <v-col>
            <v-row>
              <div style="color: white; width: fit-content;float: left;" class="margin"><h3>Preview</h3></div>
            </v-row>
            <v-row style="border-radius: 5px;float: right; position: relative;">
              <v-img height="217px" width="300px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
              <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 300px; height: fit-content;">
                <div class="center">
                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
              </div>
              </span>
            </v-row>
          </v-col>
        </v-row>
        <!-- controls and input -->
        <v-row>
          <v-col style="background-color: ghostwhite; border-radius: 5px; flex: 0 1 auto; margin-top: 10px;width: 300px;">
            <v-row>
              <v-text-field label="Display Name" style="width:210px; flex: 0 1 auto;" class="margin short" hide-details="auto"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="Channel ID" style="width:210px; flex: 0 1 auto;" class="margin short" hide-details="auto"></v-text-field>
            </v-row>
            <v-row>
              <v-select
                label="Camera"
                style="width:210px; flex: 0 1 auto;"
                class="margin short"
                hide-details="auto"
              ></v-select>
              <v-btn class="margin"  icon="icon-user-background-blur">C</v-btn>
            </v-row>
            <v-row>
            <v-select
              label="Microphone"
              style="width:210px; flex: 0 1 auto;"
              class="margin short"
              hide-details="auto"
            ></v-select>
            <v-btn class="margin" icon="icon-user-background-blur">
              M
            </v-btn>
            </v-row>
            <v-row>
              <v-select
                label="Speaker"
                style="width:210px; flex: 0 1 auto;"
                class="margin short"
                hide-details="auto"
              ></v-select>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-btn class="margin center">Join</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import "../assets/css/liveswitch.css"
</script>

<style>
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
    height: 48px;
  }
</style>