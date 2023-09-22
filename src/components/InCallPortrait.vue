<template>
    <div style="height: 100%;">
        <div style="display: flex; flex-flow: column wrap;">
            <v-img src="@/assets/logo.svg" class="logo"/>
            <div style="display: flex; justify-content: space-between;" class="margin">
                <div style="display: flex; flex-flow: row wrap;">
                    <v-menu :close-on-content-click="false" location="bottom">
                        <template v-slot:activator="{props}">
                            <v-btn v-bind="props" icon style="color: white; background-color: #323b4b;font-size: 24px;" flat>
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
                    <div style="color: white; font-size: 24px;">
                        <i class="icon-users" style="color: white; font-size: 28px;"/>
                        4
                    </div>
                </div>
                <div style="display: flex; flex-flow: row wrap; align-content: center;">
                    <v-btn style="margin-left: auto; background-color: red; color: white;" @click="leaveCall">Leave</v-btn>
                </div>
            </div>
            <div style="display: flex;flex-flow: column wrap; align-content: center;">
                <div v-if="currentTab === 'GALLERY'">
                    <div style="display: flex;">
                        <div style="display: flex; flex-flow: column wrap; justify-content: space-around;">
                            <div style="display: flex; margin: 10px 5px;">
                                <Video
                                :userCount=2
                                ask-height="240px"
                                ask-width="320px"
                                userName="Me"></Video>
                            </div>
                            <div style="display: flex; margin: 10px 5px;">
                                <Video
                                :userCount=2
                                ask-height="240px"
                                ask-width="320px"
                                userName="User 2"></Video>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; position: sticky; bottom: 10px;">
                        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;margin-right: auto;height: 36px; width: 36px;">
                            <i class="center icon-caret-left-md"/>
                        </v-btn>
                        <div style="display: flex; justify-content: center; width: fit-content;">
                            <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;height: 36px; width: 36px;">
                                <i class="center icon-flip-camera"/>
                            </v-btn>
                            <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;height: 36px; width: 36px;">
                                <i class="center icon-video"/>
                            </v-btn>
                            <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;height: 36px; width: 36px;">
                                <i class="center icon-audio-mic"/>
                            </v-btn>
                        </div>
                        <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 20px;margin-left: auto;height: 36px; width: 36px;">
                            <i class="center icon-caret-right-md"/>
                        </v-btn>
                    </div>
                </div>
                <div style="height: 545px;background-color: white;margin-bottom: 20px;border-radius: 5px; margin-right: 3px; margin-left: 3px; width: 90%;" v-else>
                    <div style="border-bottom: 3px solid black; display: flex; justify-content: center;">
                        <h3>Chat</h3>
                    </div>
                    <div style="height: 450px;">
                    </div>
                    <div style="display: flex; position: relative; flex-direction: row; width: 100%;">
                        <v-text-field
                        label="Chat Message"
                        clearable
                        style="width: 230px;"
                        class="margin input"
                        hide-details="auto"
                        ></v-text-field>
                        <v-btn style="float: right;color: white; background-color: blue; position: absolute; bottom: 5px; right: 5px">Send</v-btn>
                    </div>
                </div>
            </div>
            <div style="display: flex; position: absolute; bottom: 5px; width: 100%;">
                <v-tabs fixed-tabs bg-color="white" selected-class="activeTab" style="width: 100%;" @click="switchTab">
                    <v-tab value="gallery">Gallery</v-tab>
                    <v-tab value="chat">Chat</v-tab>
                </v-tabs>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Ref,ref } from "vue";
    import { useDisplay } from 'vuetify'
    import { useRouter } from "vue-router";
    import Video from "./Video.vue"

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

<style scoped>
  .margin {
    margin: 5px 10px 5px 10px;
  }
  div.center {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  i.center {
    margin-left: -5px;
  }
  .logo {
    height: 40px;
    margin: 10px;
  }
  .vcenter {
    margin-top: auto;
    margin-bottom: auto;
  }
  .activeTab {
    font-weight: bold;
  }
</style>