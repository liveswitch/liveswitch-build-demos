<template>
    <div class="video-wrapper" :style="{height: calcHeight, width: calcWidth}">
        <div class="video-overlay" style="background-color: #03011d; opacity: 60%;"></div>
        <div class="video-overlay" style="justify-content: center;">
            <div class="video-controls">
                <i class="margin icon" :class="cameraMuted ? 'icon-video-slash' : 'icon-video'"/>
                <i class="margin icon"  :class="micMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
            </div>
        </div>
        <div class="video-overlay" :style="pinStyle">
            <v-switch class="margin pin-switch" label="Pin" color="blue" style="color: white;" v-if="userName == 'Me'" hide-details="auto"></v-switch>
            <v-btn class="display-label" :style="labelStyle" v-if="userName">{{userName}}</v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { StyleValue, toRef, watch, Ref, ref, onMounted } from "vue";
    import { useDisplay } from 'vuetify'
    import ls from 'fm.liveswitch'
    
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
        // remote connection to properly update UI
        connection: {
            type: ls.SfuDownstreamConnection
        }
	});

    // setup media as refs
    const localMedia = toRef(props, 'localVideo');
    const remoteMedia = toRef(props, 'remoteVideo');

    // if no height or width is passed in use defaults
    var calcHeight = props.askHeight || "375px"
    var calcWidth = props.askWidth || "640px"

    // establish reactive muted states
    const cameraMuted: Ref<boolean> = ref(false);
    const micMuted: Ref<boolean> = ref(false);

    // need to know if we are on a mobile layout
    const { mobile } = useDisplay();

    // handle custom styles based on local and mobile
    const pinStyle : StyleValue = props.userName === 'Me' ? "justify-content: space-between;" : "justify-content: end;"
    const labelStyle : StyleValue = mobile && props.userName === 'Me' ? "margin-top: 14px;" : ""

    // once we have a value for local media, we should render it to the screen
    watch(localMedia, async () => {
        insertVideo()
    })

    // attempt to insert video once UI is mounted
    onMounted(() => {
        insertVideo()
    })
        
    const insertVideo = function () {
        //get video container element
        const videoContainer = document.getElementsByClassName("video-wrapper");
        if (videoContainer && videoContainer[0]) {
            let videoNode;
            let firstChild;
            // handle local case
            if (localMedia.value) {
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
                // get first child since video element will need to be first child
                // we will use the index here since there are potentially multiple remote video tiles
                firstChild = videoContainer[props.index].childNodes[0]
                // perform insert of video element
                videoContainer[props.index].insertBefore(videoNode, firstChild)
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

<style lang="scss">
    .margin {
        margin: 0px 5px;
    }
    .video-controls {
		position: absolute;
		bottom: 0;
		border-radius: 0 0 15px 15px;
		height: 100%;
	}
    .video {
        border-radius: 15px;
        margin: 0 25px 0 0;
    }
    .video-wrapper {
        border-radius: 5px;
        position: relative;
    }
    .video-controls {
        display: flex;
        justify-content: space-around;
    }
    .video-overlay {
        display: flex;
        flex-flow: row wrap;
        align-content: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 15%;
        border-radius: 0 0 15px 15px;
    }
    .icon {
        color: white;
        font-size: 40px;
    }
    .pin-switch {
        flex-grow: 0;
    }
    div.fm-video {
        width: 100% !important;
        height: 100% !important;
    }
    video {
        object-fit: cover !important;
        border-radius: 15px;
    }
    @media (max-width: 600px) or (max-height: 1000px) {
        .icon {
            color: white;
            font-size: 28px;
        }
        .pin-switch {
            flex-grow: 0;
            align-content: center;
        }
        button.display-label {
            height: 80%;
            border-radius: 15px;
            margin-right: 10px;
        }   
    }
</style>