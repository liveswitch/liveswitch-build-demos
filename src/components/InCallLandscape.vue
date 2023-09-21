<template>
    <v-container style="display: flex;">
        <v-col>
            <v-row>
                <!-- gallery view -->
                <v-col v-if="tabView == 'GALLERY'">
                    <v-row style="width: 600px; height: 340px;">
                        <v-col>
                            <v-row>
                                <v-col style="flex-grow: 0;margin: 10px;">
                                    <v-row>
                                        <div style="border-radius: 5px; width: 280px;float: right; position: relative;margin-bottom: 10px;">
                                            <v-img height="250px" width="280px" cover src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
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
                                </v-col>
                                <v-col style="flex-grow: 0; margin: 10px;">
                                    <v-row>
                                        <div style="border-radius: 5px; width: 280px;float: right; position: relative;margin-bottom: 10px;">
                                            <v-img height="250px" width="280px" cover src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;"/>
                                            <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                                <div class="center" style="margin-left: auto;">
                                                    <i class="icon-video margin" style="color: white; font-size: 40px;"/>
                                                    <i class="icon-audio-mic margin" style="color: white; font-size: 40px;"/>   
                                                </div>
                                                <v-btn class="margin vcenter">User 2</v-btn>
                                            </span>
                                        </div>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>

                                <span style="float: left;color: white; font-size: 24px; margin-right: auto;">
                                    <i class="icon-users" style="color: white; font-size: 28px;"/>
                                    4
                                </span>
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
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- chat view -->
                <v-col v-else>
                    <v-row style="width: 600px; height: 330px;background-color: white; border-radius: 5px;">
                        <v-col>
                            <v-row style="border-bottom: 3px solid black;">
                                <h3>Chat</h3>
                            </v-row>
                            <v-row style="height: 240px;">

                            </v-row>
                            <v-row>
                                <v-text-field style="margin-left: 10px; margin-right: 5px;">Enter Text</v-text-field>
                                <v-btn style="margin: 5px;">Send</v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col>
            <v-row>
                <v-img src="@/assets/logoSmall.png" class="logo"/>
            </v-row>
            <v-row>
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
            </v-row>
            <v-row>
                <v-btn icon class="center" style="color: white; background-color: #323b4b; font-size: 28px;" flat @click="switchTab('CHAT')">
                    <i class="center icon-chat"/>
                </v-btn>
            </v-row>
            <v-row>
                <v-btn icon class="center" style="color: white; background-color: #323b4b; font-size: 28px;" flat @click="switchTab('GALLERY')">
                    <i class="center icon-video"/>
                </v-btn>
            </v-row>
            <v-row>
                <v-btn style="color: white;background-color: red;" class="center" @click="leaveCall">Leave</v-btn>
            </v-row>
        </v-col>
    </v-container>
</template>

<script lang="ts" setup>
    import { Ref,ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    function leaveCall() {
        router.push('/');
    }

    const tabView: Ref<String> = ref("GALLERY");

    function switchTab(value: String) {
        tabView.value = value
    }
</script>

<style>
    .margin {
        margin: 5px;
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
        margin-top: 5px;
        margin-bottom: 5px;
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