<template>
    <div class="container">
        <div class="left-column">
            <div class="flex-center">
                <v-img src="@/assets/logo.svg" class="logo-in-call"/>
            </div>
            <div class="row-spread">
                <div class="user-counter">
                    <i class="icon-users users"/>
                    {{ remoteCounter }}
                </div>
                <div class="channel-label">
                    Channel: {{ store.state.channelId }}
                </div>
                <v-btn class="leave-button liveswitch" @click="leaveCall">Leave Call</v-btn>
            </div>
            <div class="video-grid">
                <Video
                v-if="store.state.localMedia"
                class="video"
                :local-video="store.state.localMedia"
                userName="Me"
                :askHeight="videoDimensions"
                :askWidth="videoDimensions"> </Video>
                <Video
                v-if="downstreamConnections"
                class="video"
                v-for="value in downstreamConnections"
                :remoteVideo="value.remoteMedia"
                :index="value.index"
                :userName="value.displayName"
                :maxLabelLength=10
                :connection="value.connection"
                :askHeight="videoDimensions"
                :askWidth="videoDimensions"> </Video>
            </div>
        </div>
        <div class="right-column">
            <div class="settings-menu-in-call">
                <div class="basic-flex">
                    <v-select
                        label="Camera"
                        class="margin input liveswitch"
                        hide-details="auto"
                        :items="store.state.cameraList"
                        item-title="name"
                        item-value="id"
                        v-model="store.state.activeVideoDevice"
                        @update:model-value="changeCamera"
                    ></v-select>
                    <v-btn
                    class="margin button liveswitch"
                    icon
                    @click="store.commit('toggleLocalVideoMute')">
                        <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
                    </v-btn>
                </div>
                <div class="basic-flex">
                    <v-select
                        label="Microphone"
                        class="margin input liveswitch"
                        hide-details="auto"
                        :items="store.state.microphoneList"
                        item-title="name"
                        item-value="id"
                        v-model="store.state.activeAudioDevice"
                        @update:model-value="changeMicrophone"
                    ></v-select>
                    <v-btn
                    class="margin button liveswitch"
                    icon
                    @click="store.commit('toggleLocalAudioMute')">
                        <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
                    </v-btn>
                </div>
                <div class="basic-flex">
                    <v-select
                    label="Speaker"
                    class="margin input liveswitch"
                    hide-details="auto"
                    :items="store.state.speakerList"
                    item-title="name"
                    item-value="id"
                    v-model="store.state.activeSpeakerDevice"
                    @update:model-value="changeSpeaker"
                    ></v-select>
                </div>
            </div>
            <div class="chat-container">
                <div class="chat-header">
                    <h2 class="margin">Chat</h2>
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
                        @click="sendChat">
                            Send
                    </v-btn>
                </div>
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
        videoDimensions: {
            type: String,
            required: true
        },
        downstreamConnections: {
            type: Object,
            required: true
        }
    });
    const remoteCounter = toRef(props, 'remoteCounter');
    const videoDimensions = toRef(props, 'videoDimensions');
    const chatMessage: Ref<string> = ref("");
    const downstreamConnections = toRef(props, 'downstreamConnections');

    const emit = defineEmits(['leaveCall', 'changeCamera', 'changeMicrophone', 'changeSpeaker', 'sendChat']);

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
</script>