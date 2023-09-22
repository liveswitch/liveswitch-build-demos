<template>
    <div style="display: flex; margin: 10px;">
        <div>
                <!-- gallery view -->
            <div v-if="tabView == 'GALLERY'" style="width: 600px; height: 340px;">
                <div style="display: flex; flex-direction: row; justify-content: space-around; margin: 10px 10px 0px 10px;">
                    <div>
                        <Video
                            :userCount=2
                            ask-height="265px"
                            ask-width="280px"
                            userName="Me"></Video>
                    </div>
                    <div>
                        <Video
                            :userCount=2
                            ask-height="265px"
                            ask-width="280px"
                            userName="User 2"></Video>
                    </div>
                </div>
                <div style="display: flex; flex-direction: row; position: absolute; bottom: 30px; width: 100%">
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 28px;margin-right: auto;height: 40px; width: 40px;">
                        <i class="center icon-caret-left-md"/>
                    </v-btn>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 28px;height: 40px; width: 40px;">
                        <i class="center icon-flip-camera"/>
                    </v-btn>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 28px;height: 40px; width: 40px;">
                        <i class="center icon-video"/>
                    </v-btn>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 28px;height: 40px; width: 40px;">
                        <i class="center icon-audio-mic"/>
                    </v-btn>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 28px;margin-left: auto;height: 40px; width: 40px; margin-right: auto;">
                        <i class="center icon-caret-right-md"/>
                    </v-btn>
                </div>
            </div>
            <!-- chat view -->
            <div v-else>
                <div style="width: 600px; height: 330px;background-color: white; border-radius: 5px; margin-right: 10px;">
                        <div style="border-bottom: 3px solid black;">
                            <h3>Chat</h3>
                        </div>
                        <div style="height: 240px;">
                        </div>
                        <div style="display: flex;">
                            <v-text-field style="margin-left: 10px; margin-right: 5px;">Enter Text</v-text-field>
                            <v-btn style="margin: 5px;">Send</v-btn>
                        </div>
                </div>
            </div>
        </div>
        <div style="display: flex; flex-flow: column wrap; justify-content: space-between; align-content: center;">
            <v-img src="@/assets/logoSmall.png" class="logo"/>
            <span style="float: left;color: white; font-size: 24px;" class="center">
                <i class="icon-users" style="color: white; font-size: 28px;"/>
                4
            </span>
            <v-menu :close-on-content-click="false" location="left">
                <template v-slot:activator="{props}">
                    <v-btn class="margin center" v-bind="props" icon style="color: white; background-color: #323b4b;font-size: 28px;" flat>
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
            <v-btn icon class="center" style="color: white; background-color: #323b4b; font-size: 28px;" flat @click="switchTab('CHAT')">
                <i class="center icon-chat"/>
            </v-btn>
            <v-btn icon class="center" style="color: white; background-color: #323b4b; font-size: 28px;" flat @click="switchTab('GALLERY')">
                <i class="center icon-video"/>
            </v-btn>
            <v-btn style="color: white;background-color: red; margin-bottom: 20px;" class="center" @click="leaveCall">Leave</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Ref,ref } from "vue";
    import { useRouter } from "vue-router";
    import Video from "./Video.vue"

    const router = useRouter();

    function leaveCall() {
        router.push('/');
    }

    const tabView: Ref<String> = ref("GALLERY");

    function switchTab(value: String) {
        tabView.value = value
    }
</script>

<style scoped>
    .margin {
        margin: 5px;
    }
    div.center {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
    }
    span.center {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
    }
    button.center {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .logo {
        height: 40px;
        flex-grow: 0;
    }
    .vcenter {
        margin-top: auto;
        margin-bottom: auto;
    }
    i.center {
        margin-left: -7px;
    }
  </style>