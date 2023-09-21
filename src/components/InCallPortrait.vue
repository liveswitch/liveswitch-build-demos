<template>
    <v-container>
        <v-col style="width: 320px;">
            <v-row style="height: 60px;">
                <v-img src="@/assets/logo.svg" class="logo"/>
            </v-row>
            <v-row>
                <v-menu :close-on-content-click="false" location="bottom">
                    <template v-slot:activator="{props}">
                        <v-btn class="margin" v-bind="props" icon style="color: white; background-color: #323b4b;font-size: 24px;" flat>
                            <i class="center icon-cog-gear"/>
                        </v-btn>
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
                <div style="float: left;color: white; font-size: 24px; margin-top: 7px;">
                    <i class="icon-users" style="color: white; font-size: 28px;"/>
                    4
                </div>
                <v-btn style="margin-left: auto; background-color: red; color: white; margin-top: 12px;" @click="leaveCall">Leave</v-btn>
            </v-row>
            <v-row>
                <v-col v-if="currentTab === 'GALLERY'">
                    <v-row style="display:inline-block;">
                        <v-col>
                            <v-row>
                                <div style="border-radius: 5px; width: 320px;float: right; position: relative;margin-bottom: 10px;">
                                    <v-img height="230px" width="320px" cover src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                                    <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                        <v-switch label="Pin" color="blue" style="color: white;" hide-details="auto"></v-switch>
                                        <div class="center">
                                            <i class="icon-video margin" style="color: white; font-size: 40px;"/>
                                            <i class="icon-audio-mic margin" style="color: white; font-size: 40px;"/>
                                        </div>
                                        <v-btn class="margin vcenter">Me</v-btn>
                                    </span>
                                </div>
                            </v-row>
                            <v-row>
                                <div style="border-radius: 5px; width: 320px;float: right; position: relative;">
                                    <v-img height="230px" width="320px" cover src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                                    <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                        <div class="center">
                                            <i class="icon-video margin" style="color: white; font-size: 40px;"/>
                                            <i class="icon-audio-mic margin" style="color: white; font-size: 40px;"/>
                                    </div>
                                    <v-btn class="margin vcenter">User 2</v-btn>
                                    </span>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row style="margin: 5px 0px 5px 0px;">
                        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;margin-right: auto;height: 36px; width: 36px;">
                            <i class="center icon-caret-left-md"/>
                        </v-btn>
                        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;height: 36px; width: 36px;">
                            <i class="center icon-flip-camera"/>
                        </v-btn>
                        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;height: 36px; width: 36px;">
                            <i class="center icon-video"/>
                        </v-btn>
                        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;height: 36px; width: 36px;">
                            <i class="center icon-audio-mic"/>
                        </v-btn>
                        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;margin-left: auto;height: 36px; width: 36px;">
                            <i class="center icon-caret-right-md"/>
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col style="height: 493px;background-color: white;margin-bottom: 20px;border-radius: 5px; margin-right: 3px; margin-left: 3px;" v-else>
                    <v-row style="border-bottom: 3px solid black;">
                        <h3>Chat</h3>
                    </v-row>
                    <v-row style="height: 400px;">
                    </v-row>
                    <v-row>
                        <v-text-field></v-text-field>
                        <v-btn style="color: white; background-color: blue; margin-top: 20px; margin-right: 3px;">Send</v-btn>
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
    import { useRouter } from "vue-router";

    const router = useRouter();

    function leaveCall() {
        router.push('/');
    }

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