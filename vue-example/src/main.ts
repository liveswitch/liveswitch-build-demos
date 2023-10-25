/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createStore } from 'vuex'
import ls from 'fm.liveswitch'

// Plugins
import { registerPlugins } from '@/plugins'

import "./assets/css/liveswitch.css"
import "./assets/css/app.css"
import SDKPlugin from './SDKPlugin'

// Create a new store instance.
const store = createStore({
    state () {
      return {
        localMedia: null,
        upstreamConnection: null,
        channelId: "",
        displayName: "",
        audioMuted: false,
        videoMuted: false,
        activeVideoDevice: "",
        activeAudioDevice: "",
        activeSpeakerDevice: "default",
        cameraList: new Array(),
        microphoneList: new Array(),
        speakerList: new Array(),
        pinLocal: false,
        videoList: new Array(),
        messages: new Array()
      }
    },
    mutations: {
      setLocalMedia (state, localMedia) {
        state.localMedia = localMedia
      },
      setUpstreamConnection (state, upstreamConnection) {
        state.upstreamConnection = upstreamConnection
      },
      setChannelId (state, channelId) {
        state.channelId = channelId
      },
      setDisplayName (state, displayName) {
        state.displayName = displayName
      },
      setAudioMuted (state, audioMuted) {
        state.audioMuted = audioMuted
      },
      setVideoMuted (state, videoMuted) {
        state.videoMuted = videoMuted
      },
      setActiveVideoDevice (state, deviceId) {
        state.activeVideoDevice = deviceId
      },
      setActiveAudioDevice (state, deviceId) {
        state.activeAudioDevice = deviceId
      },
      setActiveSpeakerDevice (state, deviceId) {
        state.activeSpeakerDevice = deviceId
      },
      setPinLocal (state, pinLocal) {
        state.pinLocal = pinLocal;
      },
      setVideoList(state, videoList) {
        state.videoList = videoList;
      },
      addChatMessage (state, chat) {
        let messages = state.messages;
        messages.push({user: chat.from, message: chat.text});
        state.messages = messages;
      },
      toggleLocalAudioMute (state) {
        state.audioMuted = !state.audioMuted;
        if (state.upstreamConnection) {
          const upstreamConnection = state.upstreamConnection as ls.SfuUpstreamConnection;
          // need to send an event that we have changed mute state
          // need to pull config off of the connection
          let config = upstreamConnection.getConfig();
          // update the property on the connection
          config.setLocalAudioMuted(state.audioMuted);
          // save the changes which will trigger the event to that can picked up by others in the channel
          upstreamConnection.update(config);
        }
        else if (state.localMedia) {
          let localMedia = state.localMedia as ls.LocalMedia
          localMedia.setAudioMuted(state.audioMuted)
        }
      },
      toggleLocalVideoMute (state) {
        state.videoMuted = !state.videoMuted;
        if (state.upstreamConnection) {
          const upstreamConnection = state.upstreamConnection as ls.SfuUpstreamConnection;
          // need to send an event that we have changed mute state
          // need to pull config off of the connection
          let config = upstreamConnection.getConfig();
          // update the property on the connection
          config.setLocalVideoMuted(state.videoMuted);
          // save the changes which will trigger the event to that can picked up by others in the channel
          upstreamConnection.update(config);
        }
        else if (state.localMedia) {
          let localMedia = state.localMedia as ls.LocalMedia
          localMedia.setVideoMuted(state.videoMuted)
        }
      },
      toggleVideoMute (state, media) {
        if (media instanceof ls.LocalMedia) {
          state.videoMuted = !state.videoMuted;
          let localMedia = media as ls.LocalMedia
          localMedia.setVideoMuted(state.videoMuted)
        }
        else {
          const remoteMedia = media as ls.RemoteMedia;
          remoteMedia.setVideoMuted(!remoteMedia.getVideoMuted());
        }
      },
      toggleAudioMute (state, media) {
        if (media instanceof ls.LocalMedia) {
          state.audioMuted = !state.audioMuted;
          let localMedia = media as ls.LocalMedia
          localMedia.setAudioMuted(state.audioMuted)
        }
        else {
          const remoteMedia = media as ls.RemoteMedia;
          remoteMedia.setAudioMuted(!remoteMedia.getAudioMuted());
        }
      },
      changeCamera (state, deviceId) {
        if (state.localMedia) {
          const localMedia = state.localMedia as ls.LocalMedia
          localMedia.getVideoSourceInputs().then(function(inputs: any[]){
              let videoSource = inputs.find((x: ls.SourceInput)=>{return x.getId() === deviceId})
              if (videoSource && localMedia) {
                localMedia.changeVideoSourceInput(videoSource);
                state.activeVideoDevice = deviceId;
              }
          })
        }
      },
      changeMicrophone (state, deviceId) {
        if (state.localMedia) {
          const localMedia = state.localMedia as ls.LocalMedia
          localMedia.getAudioSourceInputs().then(function(inputs: any[]){
              let audioSource = inputs.find((x: ls.SourceInput)=>{return x.getId() === deviceId})
              if (audioSource && localMedia) {
                localMedia.changeAudioSourceInput(audioSource);
                state.activeAudioDevice = deviceId;
              }
          })
        }
      },
      populateCameraList (state) {
        if (state.localMedia) {
          let localMedia = state.localMedia as ls.LocalMedia;
          localMedia.getVideoSourceInputs().then(function(inputs){
              state.cameraList = inputs.map(x=>{return { name: x.getName(), id: x.getId()}})
              // state.activeVideoDevice = localMedia.getVideoSourceInput().getId();
          }).fail(function(ex){
              console.error(ex)
          });
        }
      },
      populateMicrophoneList (state) {
        if (state.localMedia) {
          let localMedia = state.localMedia as ls.LocalMedia;
          localMedia.getAudioSourceInputs().then(function(inputs){
              state.microphoneList = inputs.map(x=>{return { name: x.getName(), id: x.getId()}})
              // state.activeAudioDevice = localMedia.getAudioSourceInput().getId();
          }).fail(function(ex){
              console.error(ex)
          });
        }
      },
      populateSpeakerList (state, remoteMedia) {
        remoteMedia.getAudioSinkOutputs().then(function(outputs: any){
          state.speakerList = outputs.map((x: ls.SinkOutput)=>{
              return { name: x.getName(), id: x.getId()}
          })
        }).fail(function(ex: any){
            console.error(ex)
        });
      },
      resetStore (state) {
        state.localMedia = null;
        state.upstreamConnection = null;
        state.channelId = "";
        state.displayName = "";
        state.audioMuted = false;
        state.videoMuted = false;
        state.activeVideoDevice = "";
        state.activeAudioDevice = "";
        state.activeSpeakerDevice = "default";
        state.cameraList = new Array();
        state.microphoneList = new Array();
        state.speakerList = new Array();
        state.pinLocal = false
        state.videoList = new Array();
        state.messages = new Array();
      }
    }
  })
  
  
ls.Log.registerProvider(new ls.ConsoleLogProvider(ls.LogLevel.Debug));

const app = createApp(App)

app.use(store)

app.use(SDKPlugin);

registerPlugins(app)

app.mount('#app')
