<template>
    <WatchBroadcast v-if="!mobile" :store="store" :remoteCounter="remoteCounter" :videoDimensions="videoDimensions" :downstreamConnections="downstreamConnections" @leaveCall="leaveCall" @change-camera="updateCamera" @change-microphone="updateMicrophone" @change-speaker="changeSpeaker" @sendChat="sendChat"/>
    <WatchBroadcastPortrait v-else-if="isPortrait" :store="store" :remoteCounter="remoteCounter" :currentTab="currentTab" :pageNumber="pageNumber" :lastPage="lastPage" @leaveCall="leaveCall" @change-camera="updateCamera" @change-microphone="updateMicrophone" @change-speaker="changeSpeaker" @sendChat="sendChat" @prevPage="prevPage" @nextPage="nextPage" @switchTab="switchTab"/>
    <WatchBroadcastLandscape v-else :store="store" :remoteCounter="remoteCounter" :currentTab="currentTab" :pageNumber="pageNumber" :lastPage="lastPage" @leaveCall="leaveCall" @change-camera="updateCamera" @change-microphone="updateMicrophone" @change-speaker="changeSpeaker" @sendChat="sendChat" @prevPage="prevPage" @nextPage="nextPage" @switchTab="switchTab"/>
  </template>
  
  <script lang="ts" setup>
    import WatchBroadcast from '@/components/WatchBroadcast.vue'
    import WatchBroadcastPortrait from '@/components/WatchBroadcastPortrait.vue'
    import WatchBroadcastLandscape from '@/components/WatchBroadcastLandscape.vue'

    import { useDisplay } from 'vuetify'

    import { Ref,ref,onMounted, watch, inject, computed } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { useStore } from 'vuex'
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

    const pageNumber : Ref<number> = ref(1);
    const maxDisplayVideo = 2;

    const currentTab: Ref<string> = ref("GALLERY");

    // Destructure only the keys you want to use
    const { mobile } = useDisplay();
    const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);

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
    function sendChat (chatMessage: string) {
        // check to make sure we will not send an empty message
        if (chatMessage.length === 0) {
            return;
        }
        // create message blob with necessary data
        liveSwitchPlugin.sendChat(channel, store.state.displayName, chatMessage);
    }

    function openDownStreamConnectionHandler (downstreamConnection: liveSwitch.SfuDownstreamConnection, remoteMedia: liveSwitch.RemoteMedia) {
        // let displayName = downstreamConnection.getRemoteConnectionInfo().getUserAlias();
        if (mobile && remoteCounter.value === 1) {
                store.commit('setVideoList', [{connection: downstreamConnection, media: remoteMedia, index: remoteCounter.value, displayName: ""}])
        }

        downstreamConnections.value[downstreamConnection.getId()] = {connection: downstreamConnection, remoteMedia: remoteMedia, index: remoteCounter.value++, displayName: ""};
        /// updateVideoLayout();
    }
    
    function chatHandler (message: string) {
        var data = JSON.parse(message)
        store.commit('addChatMessage', data);
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
        client = await liveSwitchPlugin.registerClient(store.state.displayName, store.state.channelId);
        channel = await liveSwitchPlugin.getChannel(client);

        await liveSwitchPlugin.openSfuDownstreamConnectionWithMediaId(store.state.mediaId, channel, openDownStreamConnectionHandler);

        // add handler to respond to incoming messages
        liveSwitchPlugin.addIncomingChatHandler(channel, chatHandler);
    })

    const lastPage = computed(() => {
        if (store.state.pinLocal) {
            return remoteCounter.value - 1
        }
        else {
            return Math.ceil((remoteCounter.value) / maxDisplayVideo)
        }
    })

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
        for (let key in downstreamConnections.value) {
                let remoteMedia = downstreamConnections.value[key];
                if (remoteMedia.index === ((pageNumber.value * maxDisplayVideo) - maxDisplayVideo) || remoteMedia.index === ((pageNumber.value * maxDisplayVideo) - 1)) {
                    videoList.push(remoteMedia)
                }
        }
        store.commit('setVideoList', videoList)
    }

    function switchTab(tabName: string) {
        currentTab.value = tabName;
    }

    watch(remoteCounter, function () {
        const maxRowTiles = Math.ceil(Math.sqrt(remoteCounter.value));
        const percentage = 100 / maxRowTiles;
        videoDimensions.value = 'calc(' + percentage + '% - ' + maxRowTiles * 5 + 'px)';
    })
  </script>
  