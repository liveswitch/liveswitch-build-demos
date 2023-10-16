<template>
    <div class="container">
        <div class="left-column">
            <div class="flex-center">
                <v-img src="@/assets/logo.svg" class="logo"/>
            </div>
            <div class="row-spread">
                <div class="user-counter">
                    <i class="icon-users users"/>
                    {{ remoteCounter }}
                </div>
                <v-btn class="leave-button" @click="leaveCall">Leave Call</v-btn>
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
            <div class="settings-menu">
                <div class="row">
                    <v-select
                        label="Camera"
                        class="margin input"
                        hide-details="auto"
                        :items="store.state.cameraList"
                        item-title="name"
                        item-value="id"
                        v-model="store.state.activeVideoDevice"
                        @update:model-value="store.commit('changeCamera')"
                    ></v-select>
                    <v-btn
                    class="margin button"
                    icon
                    @click="store.commit('toggleLocalVideoMute')">
                        <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
                    </v-btn>
                </div>
                <div class="row">
                    <v-select
                        label="Microphone"
                        class="margin input"
                        hide-details="auto"
                        :items="store.state.microphoneList"
                        item-title="name"
                        item-value="id"
                        v-model="store.state.activeAudioDevice"
                        @update:model-value="store.commit('changeMicrophone')"
                    ></v-select>
                    <v-btn
                    class="margin button"
                    icon
                    @click="store.commit('toggleLocalAudioMute')">
                        <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
                    </v-btn>
                </div>
                <div class="row">
                    <v-select
                    label="Speaker"
                    class="margin input"
                    hide-details="auto"
                    v-if="speakerList.length > 0"
                    :items="speakerList"
                    item-title="name"
                    item-value="id"
                    v-model="activeSpeaker"
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
                    class="margin chat-input"
                    hide-details="auto"
                    v-model="chatMessage"
                    @keydown.enter.prevent="sendChat"
                    ></v-text-field>
                    <v-btn
                        class="chat-button"
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
    import Video from "./Video.vue"
    import { useStore } from 'vuex'
    import liveSwitch from 'fm.liveswitch'
    import { DownstreamData } from '../SDKPlugin'
    
    const store = useStore();
    const router = useRouter();
    const liveSwitchPlugin: any = inject('liveSwitch');

    let client : liveSwitch.Client | null = null;
    let channel: liveSwitch.Channel | null = null;
    const media : liveSwitch.LocalMedia = store.state.localMedia;

    let downstreamConnections: Ref<{ [id: string] : DownstreamData}> = ref({});

    const activeSpeaker: Ref<string> = ref("");
    let speakerList: Ref<{name: string, id: string}[]> = ref([]);

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

    function changeSpeaker (value: any) {
        debugger;
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

        liveSwitchPlugin.createDownStreamCloseHandler(downstreamConnection, closeRemoteConnectionHandler)
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

    function chatHandler (message: string) {
        var data = JSON.parse(message)
        messages.value.push({user: data.from, message: data.text})
    }
</script>

<style scoped>
    .margin {
        margin: 5px 10px 5px 10px;
    }
    .video {
        margin: 5px
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
        height: 70px;
        margin: 0px;
    }
    .vcenter {
        margin-top: auto;
        margin-bottom: auto;
    }
    i.center {
        margin-left: -7px;
    }
    .video-grid {
        display: flex;
        width: 100%;
        height: calc(100% - 200px);
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
    .input {
        flex-grow: 0;
        width: 290px;
    }
    .chat-input {
        flex-grow: 0;
        width: 280px;
    }
    .container {
        display: flex;
        height: 100%;
    }
    .left-column {
        width: calc(100% - 400px);
    }
    .right-column {
        width: 400px;
        padding-top: 125px;
    }
    .flex-center {
        display: flex;
        justify-content: center;
    }
    .row-spread {
        display: flex;
        justify-content: space-between;
        margin: 0px 10px;
    }
    .user-counter {
        color: white;
        font-size: 24px;
    }
    .users {
        color: white;
        font-size: 28px;
    }
    .leave-button {
        background-color: red;
        color: white;
    }
    .settings-menu {
        background-color: ghostwhite;
        border-radius: 5px;
        margin: 10px;
        padding: 5px 0px;
    }
    .row {
        display: flex;
    }
    .button {
        color: white;
        background-color: rgba(3,1,28,.8);
        font-size: 24px;
    }
    .chat-container {
        background-color: ghostwhite;
        border-radius: 5px;
        margin: 10px;
        height: 60%;
        position: relative;
        top: 20px;
    }
    .chat-header {
        border-bottom: 2px solid black;
    }
    .chat-footer {
        display: flex;
        flex-direction: row;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .chat-button {
        float: right;
        color: white;
        background-color: blue;
        position: absolute;
        bottom: 5px;
        right: 5px
    }
    .chat-message {
    margin: 5px;
    border-radius: 5px;
    padding: 3px;
    width: fit-content;
    color: white;
  }
  .my-chat {
    background-color: rgb(0, 157, 255);
    margin-left: auto;
  }
  .other-chat {
    background-color: rgb(64, 156, 64);
  }
</style>