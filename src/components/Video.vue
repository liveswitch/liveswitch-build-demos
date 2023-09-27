<template>
    <div class="video-wrapper" :style="{height: calcHeight, width: calcWidth}">
        <!-- <v-img class="video" cover src="@/assets/headshot.jpeg" :style="{height: calcHeight, width: calcWidth}"/> -->
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
    import { StyleValue, toRef, watch } from "vue";
    import { useDisplay } from 'vuetify'
    import ls from 'fm.liveswitch'
import { onMounted } from "vue";
    
    const props = defineProps({
		userName: {
			type: String
		},
        userCount: {
            type: Number
        },
        askHeight: {
            type: String
        },
        askWidth: {
            type: String
        },
        video : {
            type: ls.LocalMedia
        },
        cameraMuted: {
            type: Boolean
        },
        micMuted: {
            type: Boolean
        }
	});
    const localMedia = toRef(props, 'video');
    var calcHeight = props.askHeight || "375px"
    var calcWidth = props.askWidth || "640px"

    const { mobile } = useDisplay();

    const pinStyle : StyleValue = props.userName === 'Me' ? "justify-content: space-between;" : "justify-content: end;"
    const labelStyle : StyleValue = mobile && props.userName === 'Me' ? "margin-top: 14px;" : ""

    watch(localMedia, async () => {
        insertVideo()
    })
        
    const insertVideo = function () {
        const videoContainer = document.getElementsByClassName("video-wrapper");
        if (videoContainer && videoContainer[0] && localMedia.value) {
            let videoNode = localMedia.value.getView();
            let firstChild = videoContainer[0].childNodes[1]
            videoContainer[0].insertBefore(videoNode, firstChild)
        }
    }

    onMounted(() => {
        insertVideo()
    })


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
        width: 640px !important;
        height: 375px !important;
    }
    video {
        width: 640px !important;
        height: 375px !important;
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