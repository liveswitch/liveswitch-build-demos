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
                                        @update:model-value="updateCamera"></v-select>
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
                                        @update:model-value="updateMicrophone"></v-select>
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
                                v-if="store.state.localMedia && showLocal"
                                ask-height="235px"
                                ask-width="320px"
                                :maxLabelLength=7
                                :local-video="store.state.localMedia"
                                userName="Me"></Video>
                            </div>
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
                                :maxIndex=maxDisplayVideo></Video>
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
    import { Ref,ref,onMounted, watch, inject, computed } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { useStore } from 'vuex'
    import Video from "./Video.vue"
    import liveSwitch from 'fm.liveswitch'
    import { DownstreamData } from '../SDKPlugin'
    
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const liveSwitchPlugin: any = inject('liveSwitch');

    let client : liveSwitch.Client | null = null;
    let channel: liveSwitch.Channel | null = null;
    const media : liveSwitch.LocalMedia = store.state.localMedia;

    let downstreamConnections: Ref<{ [id: string] : DownstreamData}> = ref({});

    const remoteCounter : Ref<number> = ref(1);
    let videoDimensions: Ref<string> = ref("100%");

    const chatMessage: Ref<string> = ref("");
    let messages: Ref<{user: string, message: string}[]> = ref([]);

    const pageNumber : Ref<number> = ref(1);
    const maxDisplayVideo = 2;

    const currentTab: Ref<String> = ref("GALLERY");

    const showLocal = computed(() => {
        return store.state.pinLocal || pageNumber.value === 1;
    })
    
    const lastPage = computed(() => {
        if (store.state.pinLocal) {
            return remoteCounter.value - 1
        }
        else {
            return Math.ceil((remoteCounter.value) / maxDisplayVideo)
        }
    })

    watch(store.state.pinLocal, updateVideoLayout);

    function nextPage () {
        if ((pageNumber.value * maxDisplayVideo) - 1 < remoteCounter.value ) {
            pageNumber.value++;
            updateVideoLayout()
        }
    }

    function prevPage () {
        if (pageNumber.value > 1) {
            pageNumber.value--;
            updateVideoLayout();
        }
    }

    function updateVideoLayout () {
        let videoList = new Array();
        if (store.state.pinLocal || pageNumber.value === 1) {
            for (let key in downstreamConnections.value) {
                let remoteMedia = downstreamConnections.value[key];
                if (remoteMedia.index === pageNumber.value) {
                    videoList.push(remoteMedia)
                }
            }
        }
        else {
            for (let key in downstreamConnections.value) {
                let remoteMedia = downstreamConnections.value[key];
                if (remoteMedia.index === ((pageNumber.value * maxDisplayVideo) - maxDisplayVideo) || remoteMedia.index === ((pageNumber.value * maxDisplayVideo) - 1)) {
                    videoList.push(remoteMedia)
                }
            }
        }
        store.commit('setVideoList', videoList)
    }

    function switchTab(params: any) {
        currentTab.value = params.target.innerText
    }

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
        if (remoteCounter.value === 1) {
                store.commit('setVideoList', [{connection: downstreamConnection, media: remoteMedia, index: remoteCounter.value, displayName: displayName}])
        }
        
        downstreamConnections.value[downstreamConnection.getId()] = {connection: downstreamConnection, remoteMedia: remoteMedia, index: remoteCounter.value++, displayName: displayName};

        changeSpeaker(store.state.activeSpeakerDevice);

        liveSwitchPlugin.createDownStreamCloseHandler(downstreamConnection, closeRemoteConnectionHandler)
    }
    
    function chatHandler (message: string) {
        var data = JSON.parse(message)
        messages.value.push({user: data.from, message: data.text})
    }

    onMounted(async () => {
        if (!store.state.channelId) {
            if (route.params.channelId) {
                router.push({name: 'Lobby', params: { channelId: route.params.channelId}})
            }
            else {
                router.push('/');
            }
            return;
        }
        if (!store.state.upstreamConnection) {
            // register client
            client = await liveSwitchPlugin.registerClient(store.state.displayName, store.state.channelId);
            // get active channel we connected to from the client
            channel = await liveSwitchPlugin.getChannel(client);
            // connect my local media to the conection
            liveSwitchPlugin.openSfuUpstreamConnection(store.state.localMedia, channel);
            // connect to others via downstream connections
            liveSwitchPlugin.createDownStreamOpenHandler(channel, openDownStreamConnectionHandler);
        }

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