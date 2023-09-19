<template>
    <v-container>
        <v-col style="width: 320px;">
            <v-row>
                <v-img src="@/assets/logo.svg" class="logo"/>
            </v-row>
            <v-row style="margin: 5px 0px 5px 0px;">
                <v-menu :close-on-content-click="false" location="bottom">
                    <template v-slot:activator="{props}">
                        <v-btn icon="text" v-bind="props">G</v-btn>
                    </template>
                    <v-card min-width="300" style="margin: 5px;">
                        <v-list>
                            <v-list-item>
                                <h3>Settings</h3>
                            </v-list-item>
                            <v-list-item>
                                <v-select
                                    label="Camera"
                                    style="width:275px; flex: 0 1 auto;"
                                    class="margin"
                                    hide-details="auto"></v-select>
                            </v-list-item>
                            <v-list-item>
                                <v-select
                                    label="Microphone"
                                    style="width:275px; flex: 0 1 auto;"
                                    class="margin"
                                    hide-details="auto"></v-select>
                            </v-list-item>
                            <v-list-item>
                                <v-select
                                    label="Speaker"
                                    style="width:275px; flex: 0 1 auto;"
                                    class="margin"
                                    hide-details="auto"></v-select>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
                <v-btn icon="text">4</v-btn>
                <v-btn icon="text" style="margin-left: auto;">X</v-btn>
            </v-row>
            <v-row>
                <v-col v-if="currentTab === 'GALLERY'">
                    <v-row style="display:inline-block;">
                        <v-col>
                            <v-row>
                                <div style="border-radius: 5px; width: 320px;float: right; position: relative;margin-bottom: 10px;">
                                    <v-img height="213px" width="320px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                                    <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                        <v-switch label="Pin" style="color: white;" hide-details="auto"></v-switch>
                                        <div class="center">
                                            <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                                            <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
                                        </div>
                                        <v-btn class="margin vcenter">Me</v-btn>
                                    </span>
                                </div>
                            </v-row>
                            <v-row>
                                <div style="border-radius: 5px; width: 320px;float: right; position: relative;">
                                    <v-img height="213px" width="320px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                                    <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                        <div class="center">
                                        <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                                        <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
                                    </div>
                                    <v-btn class="margin vcenter">User 2</v-btn>
                                    </span>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row style="margin: 5px 0px 5px 0px;">
                        <v-btn icon="text" style="margin-right: auto;">P</v-btn>
                        <v-btn icon="text">SC</v-btn>
                        <v-btn icon="text">C</v-btn>
                        <v-btn icon="text">M</v-btn>
                        <v-btn icon="text" style="margin-left: auto;">X</v-btn>
                    </v-row>
                </v-col>
                <v-col style="height: 493px;background-color: white;margin-bottom: 20px;border-radius: 5px;" v-else>
                    <v-row style="border-bottom: 3px solid black;">
                        <h3>Chat</h3>
                    </v-row>
                    <v-row style="height: 400px;">
                    </v-row>
                    <v-row>
                        <v-text-field></v-text-field>
                        <v-btn>Send</v-btn>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-tabs fixed-tabs bg-color="white" selected-class="activeTab" style="width: 320px;" @click="switchTab">
                    <v-tab value="gallery">Gallery</v-tab>
                    <v-tab value="chat">Chat</v-tab>
                </v-tabs>
            </v-row>
        </v-col>
    </v-container>
</template>

<script lang="ts" setup>
import { Ref,ref } from "vue";
import { useDisplay } from 'vuetify'

// Destructure only the keys you want to use
const { mobile } = useDisplay();
const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);
const currentTab: Ref<String> = ref("GALLERY");

function switchTab(params: any) {
    currentTab.value = params.target.innerText
}
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
    margin: 25px;
  }
  .vcenter {
    margin-top: auto;
    margin-bottom: auto;
  }
  .activeTab {
    font-weight: bold;
  }
</style>