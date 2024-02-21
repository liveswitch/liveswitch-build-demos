<template>
    <div class="container">
        <div class="column">
            <v-img src="@/assets/logo.svg" class="logo-in-call liveswitch"/>
            <div class="channel-label">
                Channel: {{ store.state.channelId }}
            </div>
            <div class="margin spread">
                <div class="row-in-call">
                    <v-menu :close-on-content-click="false" location="bottom">
                        <template v-slot:activator="{props}">
                            <v-btn v-bind="props" icon class="icon liveswitch" flat>
                                <i class="center icon-cog-gear"/>
                            </v-btn>
                        </template>
                        <v-card class="settings-menu-in-call">
                            <v-list>
                                <v-list-item>
                                    <h3>Settings</h3>
                                </v-list-item>
                                <v-list-item>
                                    <v-select
                                        label="Camera"
                                        class="margin input-in-call liveswitch"
                                        hide-details="auto"
                                        :items="store.state.cameraList"
                                        item-title="name"
                                        item-value="id"
                                        v-model="store.state.activeVideoDevice"
                                        @update:model-value="changeCamera"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-select
                                        label="Microphone"
                                        class="margin input-in-call liveswitch"
                                        hide-details="auto"
                                        :items="store.state.microphoneList"
                                        item-title="name"
                                        item-value="id"
                                        v-model="store.state.activeAudioDevice"
                                        @update:model-value="changeMicrophone"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-select
                                        label="Speaker"
                                        class="margin input-in-call liveswitch"
                                        hide-details="auto"
                                        :items="store.state.speakerList"
                                        item-title="name"
                                        item-value="id"
                                        v-model="store.state.activeSpeakerDevice"
                                        @update:model-value="changeSpeaker"></v-select>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                    <div class="users-container">
                        <i class="icon-users users"/>
                        {{ remoteCounter }}
                    </div>
                </div>
                <div class="button-wrapper">
                    <v-btn class="leave-button liveswitch" @click="leaveCall">Leave</v-btn>
                </div>
            </div>
            <div class="tab-container">
                <div v-if="currentTab === 'GALLERY'">
                    <div class="basic-flex">
                        <div class="even-spacing">
                            <div class="video-container">
                                <Video
                                v-if="store.state.videoList"
                                v-for="value in store.state.videoList"
                                :remoteVideo="value.media"
                                :index="value.index"
                                :userName="value.displayName"
                                :connection="value.connection"
                                :maxLabelLength=7
                                ask-height="235px"
                                ask-width="320px"
                                :maxIndex=2></Video>
                            </div>
                        </div>
                    </div>
                    <div class="controls-container">
                        <v-btn class="margin align-left liveswitch" :class="pageNumber === 1 ? 'inactive-button' : 'active-button'" icon @click="prevPage">
                            <i class="center icon-caret-left-md"/>
                        </v-btn>
                        <div class="row-center">
                            <v-btn class="margin active-button liveswitch" icon @click="store.commit('toggleLocalVideoMute')">
                                <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
                            </v-btn>
                            <v-btn class="margin active-button liveswitch" icon @click="store.commit('toggleLocalAudioMute')">
                                <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
                            </v-btn>
                        </div>
                        <v-btn class="margin active-button align-right liveswitch" :class="pageNumber === lastPage ? 'inactive-button' : 'active-button'" icon @click="nextPage">
                            <i class="center icon-caret-right-md"/>
                        </v-btn>
                    </div>
                </div>
                <div v-else class="chat-container">
                    <div class="chat-header">
                        <h3>Chat</h3>
                    </div>
                    <div class="chat-body">
                        <div
                        v-for="value in store.state.messages">
                            <div class="chat-message" :class="value.user === store.state.displayName ? 'my-chat' : 'other-chat'">
                                {{ value.user }}: {{ value.message }}
                            </div>
                        </div>
                    </div>
                    <div class="chat-footer">
                        <v-text-field
                        label="Chat Message"
                        clearable
                        class="margin chat-input liveswitch"
                        hide-details="auto"
                        v-model="chatMessage"
                        @keydown.enter.prevent="sendChat"
                        ></v-text-field>
                        <v-btn
                        class="chat-button liveswitch"
                        @click="sendChat">Send</v-btn>
                    </div>
                </div>
            </div>
            <div class="tab-buttons">
                <v-tabs fixed-tabs selected-class="activeTab" class="tabs" @click="switchTab">
                    <v-tab value="gallery">Gallery</v-tab>
                    <v-tab value="chat">Chat</v-tab>
                </v-tabs>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { toRef,Ref, ref } from "vue";
    import Video from "./Video.vue";

    const props = defineProps({
        store: {
            type: Object,
            required: true
        },
        remoteCounter: {
            type: Number,
            required: true
        },
        currentTab: {
            type: String,
            required: true
        },
        pageNumber: {
            type: Number,
            required: true
        },
        lastPage: {
            type: Number,
            required: true
        }
    });
    const remoteCounter = toRef(props, 'remoteCounter');
    const currentTab = toRef(props, 'currentTab');
    const chatMessage: Ref<string> = ref("");

    const emit = defineEmits(['leaveCall', 'changeCamera', 'changeMicrophone', 'changeSpeaker', 'sendChat', 'prevPage', 'nextPage', 'switchTab']);

    const leaveCall = (event: any) => {
        emit('leaveCall', event);
    }
    const changeCamera = (deviceId: String) => {
        emit('changeCamera', deviceId);
    }
    const changeMicrophone = (deviceId: String) => {
        emit('changeMicrophone', deviceId);
    }
    const changeSpeaker = (deviceId: String) => {
        emit('changeSpeaker', deviceId);
    }
    const sendChat = () => {
        emit('sendChat', chatMessage.value);
        chatMessage.value = "";
    }
    const prevPage = () => {
        emit('prevPage');
    }
    const nextPage = () => {
        emit('nextPage');
    }
    const switchTab = (params: any) => {
        emit('switchTab', params.target.innerText);
    }
</script>