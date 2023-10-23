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
                        @update:model-value="updateCamera"
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
                        @update:model-value="updateMicrophone"
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
                    v-if="store.state.speakerList.length > 0"
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
                        v-for="value in messages">
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
    import { Ref,ref,onMounted, watch, inject } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from 'vuex'
    import Video from "./Video.vue"
    import liveSwitch from 'fm.liveswitch'
    import { DownstreamData } from '../SDKPlugin'
    
    const store = useStore();
    const router = useRouter();
    const liveSwitchPlugin: any = inject('liveSwitch');

    let client : liveSwitch.Client | null = null;
    let channel: liveSwitch.Channel | null = null;
    const media : liveSwitch.LocalMedia = store.state.localMedia;

    let downstreamConnections: Ref<{ [id: string] : DownstreamData}> = ref({});

    const remoteCounter : Ref<number> = ref(1);
    let videoDimensions: Ref<string> = ref("100%");

    const chatMessage: Ref<string> = ref("");
    let messages: Ref<{user: string, message: string}[]> = ref([]);

    watch(remoteCounter, function () {
        const maxRowTiles = Math.ceil(Math.sqrt(remoteCounter.value));
        const percentage = 100 / maxRowTiles;
        videoDimensions.value = 'calc(' + percentage + '% - ' + maxRowTiles * 5 + 'px)';
    })

    // handler function for leave button
    async function leaveCall() {
        await liveSwitchPlugin.disconnectFromMeeting(downstreamConnections.value, client, media);

        media.destroy();
        store.commit('resetStore');
        // switch back to home page
        router.push('/');
    }


    function updateCamera (deviceId: string) {
      store.commit('changeCamera', deviceId)
    }
    function updateMicrophone (deviceId: string) {
      store.commit('changeMicrophone', deviceId)
    }
    
    async function changeSpeaker (deviceId: string) {
        const connectionId = Object.keys(downstreamConnections.value)[0];
        const firstConnection: DownstreamData = downstreamConnections.value[connectionId];
        const newSpeakerDevice = await liveSwitchPlugin.getAudioSink(deviceId, firstConnection);
        liveSwitchPlugin.updateSpeaker(downstreamConnections.value, newSpeakerDevice);
        store.commit('setActiveSpeakerDevice', deviceId)
    }

    function closeRemoteConnectionHandler (connection: liveSwitch.SfuDownstreamConnection) {
        const downstreamData = downstreamConnections.value[connection.getId()];
        // delete the remote media
        downstreamData.remoteMedia.destroy();
        delete downstreamConnections.value[connection.getId()];
        //update the video tile index counter
        remoteCounter.value--;
    }

    // send button handler
    function sendChat () {
        // check to make sure we will not send an empty message
        if (chatMessage.value.length === 0) {
            return;
        }
        // create message blob with necessary data
        liveSwitchPlugin.sendChat(channel, store.state.displayName, chatMessage.value);
        // reset ref to clear input box
        chatMessage.value = "";
    }

    function openDownStreamConnectionHandler (downstreamConnection: liveSwitch.SfuDownstreamConnection, remoteMedia: liveSwitch.RemoteMedia) {
        let displayName = downstreamConnection.getRemoteConnectionInfo().getUserAlias();
        downstreamConnections.value[downstreamConnection.getId()] = {connection: downstreamConnection, remoteMedia: remoteMedia, index: remoteCounter.value++, displayName: displayName};

        changeSpeaker(store.state.activeSpeakerDevice);

        liveSwitchPlugin.createDownStreamCloseHandler(downstreamConnection, closeRemoteConnectionHandler)
    }
    
    function chatHandler (message: string) {
        var data = JSON.parse(message)
        messages.value.push({user: data.from, message: data.text})
    }

    onMounted(async () => {
        // register client
        client = await liveSwitchPlugin.registerClient(store.state.displayName, store.state.channelId);
        // get active channel we connected to from the client
        channel = await liveSwitchPlugin.getChannel(client);
        // connect my local media to the conection
        liveSwitchPlugin.openSfuUpstreamConnection(store.state.localMedia, channel);
        // connect to others via downstream connections
        liveSwitchPlugin.createDownStreamOpenHandler(channel, openDownStreamConnectionHandler);

        store.commit('setLocalMedia', media)

        store.commit('populateCameraList')
        store.commit('populateMicrophoneList')

        store.commit('setActiveVideoDevice', media.getVideoSourceInput().getId());
        store.commit('setActiveAudioDevice', media.getAudioSourceInput().getId());


        store.commit('setVideoMuted', media.getVideoMuted());
        store.commit('setAudioMuted', media.getAudioMuted());

        // add handler to respond to incoming messages
        liveSwitchPlugin.addIncomingChatHandler(channel, chatHandler);
    })
</script>