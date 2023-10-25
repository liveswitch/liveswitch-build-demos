<template>
    <div class="container">
        <div>
            <div v-if="currentTab == 'GALLERY'" class="tab-container">
                <div class="channel-label">
                    Channel: {{ store.state.channelId }}
                </div>
                <div class="video-container">
                    <div>
                        <Video
                            v-if="store.state.localMedia && showLocal"
                            ask-height="240px"
                            ask-width="280px"
                            :maxLabelLength=5
                            :local-video="store.state.localMedia"
                            userName="Me"></Video>
                    </div>
                    <div class="basic-flex">
                        <Video
                            v-if="store.state.videoList"
                            v-for="value in store.state.videoList"
                            :remoteVideo="value.media"
                            :index="value.index"
                            :userName="value.displayName"
                            :connection="value.connection"
                            ask-height="240px"
                            ask-width="280px"
                            :maxLabelLength=5
                            :maxIndex=2></Video>
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
                    <v-btn class="margin align-right liveswitch" :class="pageNumber === lastPage ? 'inactive-button' : 'active-button'" icon @click="nextPage">
                        <i class="center icon-caret-right-md"/>
                    </v-btn>
                </div>
            </div>
            <!-- chat view -->
            <div v-else>
                <div class="chat-container">
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
                        <div class="basic-flex">
                            <v-text-field
                            label="Chat Message"
                            clearable
                            class="chat-input liveswitch"
                            hide-details="auto"
                            v-model="chatMessage"
                            @keydown.enter.prevent="sendChat"></v-text-field>
                            <v-btn
                            class="chat-button liveswitch"
                            @click="sendChat">Send</v-btn>
                        </div>
                </div>
            </div>
        </div>
        <div class="right-column">
            <v-img src="@/assets/logoSmall.png" class="logo-in-call liveswitch"/>
            <span class="center users-container">
                <i class="icon-users users"/>
                {{ remoteCounter }}
            </span>
            <v-menu :close-on-content-click="false" location="left">
                <template v-slot:activator="{props}">
                    <v-btn class="margin center icon liveswitch" v-bind="props" icon flat>
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
            <v-btn icon class="center icon liveswitch" flat @click="switchTab('CHAT')">
                <i class="center icon-chat"/>
            </v-btn>
            <v-btn icon class="center icon liveswitch" flat @click="switchTab('GALLERY')">
                <i class="center icon-video"/>
            </v-btn>
            <v-btn class="center leave-button liveswitch" @click="leaveCall">Leave</v-btn>
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
        showLocal: {
            type: Boolean,
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
    const switchTab = (tabName: string) => {
        emit('switchTab', tabName);
    }
</script>