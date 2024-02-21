<template>
    <div class="video-wrapper" :style="{height: calcHeight, width: calcWidth}">
        <div class="video-overlay" style="background-color: #03011d; opacity: 60%;"></div>
        <div class="video-overlay" style="justify-content: center;">
            <div class="video-controls">
                <i class="video-margin icon-player" :class="cameraMuted ? 'icon-video-slash' : 'icon-video'" @click="toggleVideoMute"/>
                <i class="video-margin icon-player"  :class="micMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'" @click="toggleAudioMute"/>
            </div>
        </div>
        <div class="video-overlay" :style="pinStyle">
            <v-switch
            class="video-margin pin-switch"
            label="Pin"
            color="blue"
            style="color: white;"
            v-if="userName == 'Me' && mobile"
            v-model="pinLocal"
            hide-details="auto"></v-switch>
            <v-btn class="display-label" :style="labelStyle" v-if="userName">{{maxLabelLength && userName.length > maxLabelLength ? userName.substring(0,maxLabelLength) + '...' : userName}}</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { StyleValue, toRef, watch, Ref, ref, onMounted } from "vue";
    import { useDisplay } from 'vuetify'
    import ls from 'fm.liveswitch'
    import { useStore } from 'vuex'
    
    // incoming props for this component
    const props = defineProps({
        // same as display name
		userName: {
			type: String
		},
        // optional height prop
        askHeight: {
            type: String
        },
        // optional width prop
        askWidth: {
            type: String
        },
        // video object if local 
        localVideo : {
            type: ls.LocalMedia
        },
        // video object if remote
        remoteVideo : {
            type: Object
        },
        // used to determine position to insert video
        index: {
            type: Number
        },
        maxIndex: {
            type: Number
        },
        // remote connection to properly update UI
        connection: {
            type: ls.SfuDownstreamConnection
        },
        maxLabelLength: {
            type: Number
        }
	});

    const store = useStore();

    const pinLocal : Ref<boolean> = ref(store.state.pinLocal);

    // setup media as refs
    const localMedia = toRef(props, 'localVideo');
    const remoteMedia = toRef(props, 'remoteVideo');

    // if no height or width is passed in use defaults
    const calcHeight = toRef(props, 'askHeight', "375px")
    const calcWidth = toRef(props, 'askWidth', "640px")

    // establish reactive muted states
    const cameraMuted: Ref<boolean> = ref(false);
    const micMuted: Ref<boolean> = ref(false);

    // need to know if we are on a mobile layout
    const { mobile } = useDisplay();

    // handle custom styles based on local and mobile
    const pinStyle : StyleValue = (props.userName === 'Me' && mobile.value) ? "justify-content: space-between;" : "justify-content: end;"
    const labelStyle : StyleValue = mobile && props.userName === 'Me' ? "margin-top: auto; margin-bottom: auto" : ""

    // once we have a value for local media, we should render it to the screen
    watch(localMedia, async () => {
        insertVideo()
    });

    watch(pinLocal, () => {
        store.commit('setPinLocal', pinLocal.value);
    })

    // attempt to insert video once UI is mounted
    onMounted(() => {
        insertVideo()
    })

    const toggleVideoMute = function () {
        store.commit('toggleVideoMute', localMedia.value ? localMedia.value : remoteMedia.value)
        if (localMedia.value) {
            cameraMuted.value = store.state.videoMuted
        } 
        else {
            cameraMuted.value = !cameraMuted.value
        }
    }

    const toggleAudioMute = function () {
        store.commit('toggleAudioMute', localMedia.value ? localMedia.value : remoteMedia.value)
        if (localMedia.value) {
            micMuted.value = store.state.audioMuted
        } 
        else {
            micMuted.value = !micMuted.value
        }
    }
        
    const insertVideo = function () {
        //get video container element
        const videoContainer = document.getElementsByClassName("video-wrapper");
        if (videoContainer && videoContainer[0]) {
            let videoNode;
            let firstChild;
            // handle local case
            if (localMedia.value) {
                // make sure not to double insert a video
                for (let childIndex in videoContainer[0].childNodes) {
                    const child = videoContainer[0].childNodes[childIndex] as HTMLElement
                    if (child.classList?.contains("fm-video")) {
                        return;
                    }
                }
                // get UI element from media
                videoNode = localMedia.value.getView();
                // get first child since video element will need to be first child
                firstChild = videoContainer[0].childNodes[0]
                // perform insert of video element
                videoContainer[0].insertBefore(videoNode, firstChild)
            }
            else if (remoteMedia.value && props.index) {
                // get UI element from media
                videoNode = remoteMedia.value.getView();
                let insertPosition = 0;
                // make sure not to double insert a video
                for (let childIndex in videoContainer[insertPosition].childNodes) {
                    const child = videoContainer[insertPosition].childNodes[childIndex] as HTMLElement
                    if (child.classList?.contains("fm-video")) {
                        console.log("Video already inserted");
                        return;
                    }
                }
                if (props.maxIndex && insertPosition > props.maxIndex - 1) {
                    if (store.state.pinLocal) {
                        insertPosition = 1;
                    }
                    else {
                        insertPosition = insertPosition % props.maxIndex
                    }
                }
                // get first child since video element will need to be first child
                // we will use the index here since there are potentially multiple remote video tiles
                firstChild = videoContainer[insertPosition].childNodes[0]
                // perform insert of video element
                videoContainer[insertPosition].insertBefore(videoNode, firstChild)
            }
        }
        // add listeners for local mute states
        if (localMedia && localMedia.value) {
            localMedia.value?.addOnAudioMuted(() => {
                micMuted.value = true;
            })
            localMedia.value?.addOnAudioUnmuted(() => {
                micMuted.value = false;
            })
            localMedia.value?.addOnVideoMuted(() => {
                cameraMuted.value = true;
            })
            localMedia.value?.addOnVideoUnmuted(() => {
                cameraMuted.value = false;
            })
        }
        // add listeners for remote updates
        else if (remoteMedia && remoteMedia.value) {
            props.connection?.addOnRemoteUpdate((old, connectionInfo) => {
                // since we do not get specific handlers like we do on local media,
                // we need to assume both audio and video states could have changed
                micMuted.value = connectionInfo.getLocalAudioMuted();
                cameraMuted.value = connectionInfo.getLocalVideoMuted();
            })
        }
    }
</script>