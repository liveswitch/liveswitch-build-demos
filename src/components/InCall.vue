<template>
    <v-container>
        <v-row>
            <v-col style="width: 525px;">
                <v-row>
                    <v-img src="@/assets/logo.svg" class="logo"/>
                </v-row>
                <v-row>
                    <div style="float: left;color: white;">4</div>
                    <v-btn style="margin-left: auto;background-color: red;color: white;">Leave Call</v-btn>
                </v-row>
                <v-row>
                    <v-col>
                        <div style="border-radius: 5px; width: 563px;float: right; position: relative;">
                            <v-img height="375px" width="563px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                            <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                <div class="center">
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
                            </div>
                            <v-btn class="margin vcenter">Me</v-btn>
                            </span>
                        </div>
                    </v-col>
                    <v-col>
                        <div style="border-radius: 5px; width: 563px;float: right; position: relative;">
                            <v-img height="375px" width="563px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                            <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                <div class="center">
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
                            </div>
                            <v-btn class="margin vcenter">User 2</v-btn>
                            </span>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div style="border-radius: 5px; width: 563px;float: right; position: relative;">
                            <v-img height="375px" width="563px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                            <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                <div class="center">
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
                            </div>
                            <v-btn class="margin vcenter">User 3</v-btn>
                            </span>
                        </div>
                    </v-col>
                    <v-col>
                        <div style="border-radius: 5px; width: 563px;float: right; position: relative;">
                            <v-img height="375px" width="563px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                            <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                <div class="center">
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                                <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
                            </div>
                            <v-btn class="margin vcenter">User 4</v-btn>
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col style="width: 375px;flex-grow: .33; padding-top: 125px;">
                <v-row>
                    <v-col style="background-color: ghostwhite; border-radius: 5px; margin: 10px;">
                        <v-row>
                            <v-select
                            label="Camera"
                            style="width:275px; flex: 0 1 auto;"
                            class="margin"
                            hide-details="auto"
                            ></v-select>
                            <v-btn class="margin" icon="icon-user-background-blur">C</v-btn>
                        </v-row>
                        <v-row>
                        <v-select
                            label="Microphone"
                            style="width:275px; flex: 0 1 auto;"
                            class="margin"
                            hide-details="auto"
                        ></v-select>
                        <v-btn class="margin" icon="icon-user-background-blur">
                            M
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
                    </v-col>
                </v-row>
                <v-row style="height: auto">
                    <v-col style="background-color: ghostwhite; border-radius: 5px; margin: 10px;height: 100%;">
                        <v-row style="border-bottom: 2px solid black;">
                            <h2>Chat</h2>
                        </v-row>
                        <v-row style="height: 450px;">
                            <div></div>
                        </v-row>
                        <v-row style="display: flexbox;">
                            <v-text-field
                            label="Speaker"
                            style="width:275px; flex: 0 1 auto;"
                            class="margin"
                            hide-details="auto"
                            ></v-text-field>
                            <v-btn style="float: right;">Send</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts" setup>
import { Ref,ref } from "vue";
import { useDisplay } from 'vuetify'

// Destructure only the keys you want to use
const { mobile } = useDisplay();
const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);
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
    height: 67px;
    margin: 10px;
  }
  .vcenter {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>