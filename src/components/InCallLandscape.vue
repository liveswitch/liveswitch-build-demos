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
                                        <div style="border-radius: 5px; width: 275px;float: right; position: relative;margin-bottom: 10px;">
                                            <v-img height="250px" width="275px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;" cover/>
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
                                </v-col>
                                <v-col style="flex-grow: 0; margin: 10px;">
                                    <v-row>
                                        <div style="border-radius: 5px; width: 275px;float: right; position: relative;margin-bottom: 10px;">
                                            <v-img height="250px" width="275px" src="@/assets/headshot.jpeg" style="margin: 0 25px 0 0;" cover/>
                                            <span style="background-color: #03011d; opacity: 60%;position: absolute; bottom: 0; width: 100%; height: fit-content;display: flex;">
                                                <div class="center">
                                                    <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">C</v-btn>
                                                    <v-btn class="margin"  icon="icon-user-background-blur" style="opacity: 100%;">M</v-btn>
                                                </div>
                                                <v-btn class="margin vcenter">Me</v-btn>
                                            </span>
                                        </div>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <span style="color: white;margin-right: auto;" class="vcenter">4</span>
                                <v-btn icon="test" style="margin-right: 25px;">P</v-btn>
                                <v-btn icon="test">SC</v-btn>
                                <v-btn icon="test">V</v-btn>
                                <v-btn icon="test">M</v-btn>
                                <v-btn icon="test" style="margin-right: auto; margin-left: 25px;">N</v-btn>
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
                        <v-btn icon="text" class="center" v-bind="props">G</v-btn>
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
                <v-btn icon="test" class="center" @click="switchTab('CHAT')">C</v-btn>
            </v-row>
            <v-row>
                <v-btn icon="test" class="center" @click="switchTab('GALLERY')">V</v-btn>
            </v-row>
            <v-row>
                <v-btn icon="test" style="color: white;background-color: red;" class="center">X</v-btn>
            </v-row>
        </v-col>
    </v-container>
</template>

<script lang="ts" setup>
import { Ref,ref } from "vue";

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