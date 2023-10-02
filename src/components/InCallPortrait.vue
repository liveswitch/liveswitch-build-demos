<template>
    <div class="container">
        <div class="column">
            <v-img src="@/assets/logo.svg" class="logo"/>
            <div class="margin spread">
                <div class="row">
                    <v-menu :close-on-content-click="false" location="bottom">
                        <template v-slot:activator="{props}">
                            <v-btn v-bind="props" icon class="icon" flat>
                                <i class="center icon-cog-gear"/>
                            </v-btn>
                        </template>
                        <v-card class="settings-menu">
                            <v-list>
                                <v-list-item>
                                    <h3>Settings</h3>
                                </v-list-item>
                                <v-list-item>
                                    <v-select
                                        label="Camera"
                                        class="margin input"
                                        hide-details="auto"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-select
                                        label="Microphone"
                                        class="margin input"
                                        hide-details="auto"></v-select>
                                </v-list-item>
                                <v-list-item>
                                    <v-select
                                        label="Speaker"
                                        class="margin input"
                                        hide-details="auto"></v-select>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                    <div class="users-container">
                        <i class="icon-users users"/>
                        4
                    </div>
                </div>
                <div class="button-wrapper">
                    <v-btn class="leave-button" @click="leaveCall">Leave</v-btn>
                </div>
            </div>
            <div class="tab-container">
                <div v-if="currentTab === 'GALLERY'">
                    <div class="basic-flex">
                        <div class="even-spacing">
                            <div class="video-container">
                                <Video
                                :userCount=2
                                ask-height="240px"
                                ask-width="320px"
                                :local-video="store.state.localMedia"
                                userName="Me"></Video>
                            </div>
                            <div class="video-container">
                                <Video
                                :userCount=2
                                ask-height="240px"
                                ask-width="320px"
                                userName="User 2"></Video>
                            </div>
                        </div>
                    </div>
                    <div class="controls-container">
                        <v-btn class="margin button align-left" icon>
                            <i class="center icon-caret-left-md"/>
                        </v-btn>
                        <div class="row-center">
                            <v-btn class="margin button" icon>
                                <i class="center icon-flip-camera"/>
                            </v-btn>
                            <v-btn class="margin button" icon @click="store.commit('toggleLocalVideoMute')">
                                <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
                            </v-btn>
                            <v-btn class="margin button" icon @click="store.commit('toggleLocalAudioMute')">
                                <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
                            </v-btn>
                        </div>
                        <v-btn class="margin button align-right" icon>
                            <i class="center icon-caret-right-md"/>
                        </v-btn>
                    </div>
                </div>
                <div v-else class="chat-container">
                    <div class="chat-header">
                        <h3>Chat</h3>
                    </div>
                    <div class="chat-body">
                    </div>
                    <div class="chat-footer">
                        <v-text-field
                        label="Chat Message"
                        clearable
                        class="margin chat-input"
                        hide-details="auto"
                        ></v-text-field>
                        <v-btn class="chat-button">Send</v-btn>
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
    import { Ref,ref,onMounted } from "vue";
    import { useRouter } from "vue-router";
    import Video from "./Video.vue"
    import { useStore } from 'vuex'
    import ls from 'fm.liveswitch'
    import config from '../../liveswitch_config.json'

    const store = useStore();
    const router = useRouter();

    let speakerList: Ref<{name: string, id: string}[]> = ref([]);

    const activeSpeaker: Ref<string> = ref("");

    const remoteCounter : Ref<number> = ref(1);

    const media : ls.LocalMedia = store.state.localMedia;
    let channel: ls.Channel | null = null;
    let client : ls.Client | null = null;

    let upstreamConnection: Ref<ls.SfuUpstreamConnection | undefined> = ref(undefined);
    let downstreamConnections: Ref<{ [id: string] : 
        {connection: ls.SfuDownstreamConnection, media: ls.RemoteMedia, index: number, displayName: string }}> = ref({});

    const chatMessage: Ref<string> = ref("");
    let messages: Ref<{user: string, message: string}[]> = ref([]);


    // handler function for leave button
    function leaveCall() {
        // loop through downstream connections we have a reference to
        for (let key in downstreamConnections.value) {
            //pull of the connection object
            const dsConnection = downstreamConnections.value[key].connection;
            // if the connection is not closed or in a state of closing, close it
            if (dsConnection.getState() !== ls.ConnectionState.Closed.valueOf() || dsConnection.getState() !== ls.ConnectionState.Closing) {
                dsConnection.close();
            }
            // remove the connection from out local list
            delete downstreamConnections.value[key];
        }
        // handle local connection
        leaveAsync();
        // switch back to home page
        router.push('/');
    }

    function changeSpeaker (value: any) {
        debugger;
    }

    // send button handler
    function sendChat () {
        // check to make sure we will not send an empty message
        if (chatMessage.value.length === 0) {
            return;
        }
        // create message blob with necessary data
        let dateObj = new Date();
        var message = {
            from: store.state.displayName, 
            timestamp: (new Date().getTime()), 
            timestampHourFormat: dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            timestampDateFormat: (dateObj.toLocaleString()),
            text: chatMessage.value
        }
        // if we have a channel, send the message
        if (channel) {
            channel.sendMessage(JSON.stringify(message))
        }
        // reset ref to clear input box
        chatMessage.value = "";
    }

    onMounted(async () => {
        // wait to join until after UI has been rendered
        await joinAsync();

        store.commit('setLocalMedia', media)

        store.commit('populateCameraList')
        store.commit('populateMicrophoneList')

        store.commit('setActiveVideoDevice', media.getVideoSourceInput().getId());
        store.commit('setActiveAudioDevice', media.getAudioSourceInput().getId());


        store.commit('setVideoMuted', media.getVideoMuted());
        store.commit('setAudioMuted', media.getAudioMuted());

        // add handler to respond to incoming messages
        if (channel) {
            channel.addOnMessage(function(sender, message){
                // if(channel && channel.getClientId() == sender.getId()){
                //     return;
                // }
                var data = JSON.parse(message)
                console.log(message);
                messages.value.push({user: data.from, message: data.text})
            })
        }
    })

    // function that joins to a channel and session
    async function joinAsync (this: any) {
        const promise = new ls.Promise();

        // Create a client.
        client = new ls.Client(config.gatewayUrl, config.applicationId);
        // set display name
        client.setUserAlias(store.state.displayName);

        // Generate a token (do this on the server to avoid exposing your shared secret).
        const token = ls.Token.generateClientRegisterToken(
            config.applicationId,
            client.getUserId(),
            client.getDeviceId(),
            client.getId(),
            [new ls.ChannelClaim(store.state.channelId)],
            config.sharedSecret
        );

        // Register client with token.
        client
            .register(token)
            .then((channels: any) => {
                onClientRegistered(channels);
                promise.resolve(null);
            })
            .fail((ex: any) => {
                ls.Log.error("Failed to register with Gateway.");
                promise.reject(ex);
            });

        return promise;
    };

    // handler called once the client has been registered
    function onClientRegistered (this: any, channels: any) {
        // Store our channel reference.
        channel = channels[0];

        // Open a new SFU upstream connection.
        const upstreamConnection = openSfuUpstreamConnection(store.state.localMedia);
        store.commit('setUpstreamConnection', upstreamConnection);

        if (channel) {
        // Open a new SFU downstream connection when a remote upstream connection is opened.
            channel.addOnRemoteUpstreamConnectionOpen((remoteConnectionInfo) =>
                openSfuDownstreamConnection(remoteConnectionInfo, channel)
            );
        }
    };

    // handle setting up the downstream connection
    function openSfuDownstreamConnection (remoteConnectionInfo: ls.ConnectionInfo, channel: ls.Channel | null) {
        // Create remote media.
        const remoteMedia = new ls.RemoteMedia();
        const audioStream = new ls.AudioStream(remoteMedia);
        const videoStream = new ls.VideoStream(remoteMedia);
        
        if (channel) {
            // Create a SFU downstream connection with remote audio and video.
            const connection = channel.createSfuDownstreamConnection(
                remoteConnectionInfo,
                audioStream,
                videoStream
            );
            // Store the downstream connection and its components.
            downstreamConnections.value[connection.getId()] = {connection: connection, media: remoteMedia, index: remoteCounter.value++, displayName: remoteConnectionInfo.getUserAlias()};
            
            //seed the speaker list if we do not have one
            if (speakerList.value.length === 0) {
                remoteMedia.getAudioSinkOutputs().then(function(outputs: any){
                    speakerList.value = outputs.map((x: ls.SourceInput)=>{
                        //set default as active on the first pass
                        if (x.getId() === "default") {
                            activeSpeaker.value = x.getId();
                        }
                        return { name: x.getName(), id: x.getId()}
                    })
                }).fail(function(ex: any){
                    console.error(ex)
                });
            }

            connection.addOnStateChange((conn) => {
                // Remove the remote media from the layout and destroy it if the remote is closed.
                if (conn.getRemoteClosed()) {
                    // remove connection from our list
                    delete downstreamConnections.value[connection.getId()];
                    // delete the remote media
                    remoteMedia.destroy();
                    //update the video tile index counter
                    remoteCounter.value--;
                }
            });

            // open connection now that our handlers have been set
            connection.open();
            return connection;
        }
    };

    function openSfuUpstreamConnection (localMedia: ls.LocalMedia) {
        // Create audio and video streams from local media.
        const audioStream = new ls.AudioStream(localMedia);
        const videoStream = new ls.VideoStream(localMedia);

        //channel is required so exit if it is null
        if (!channel) {
            return;
        }

        // Create a SFU upstream connection with local audio and video.
        const connection = channel.createSfuUpstreamConnection(
            audioStream,
            videoStream
        );

        // add logging for remote state
        connection.addOnStateChange((conn) => {
            ls.Log.debug(
                `Upstream connection is ${new ls.ConnectionStateWrapper(
                    conn.getState()
                ).toString()}.`
            );
        });

        // open connection now that handlers have been added
        connection.open();
        return connection;
    };

    // when leaving a meeting, this handles disconnecting from the client
    function leaveAsync () {
        if (client) {
            return client
                .unregister()
                .fail(() => ls.Log.error("Unregistration failed."));
        }
    };

    // Destructure only the keys you want to use
    const currentTab: Ref<String> = ref("GALLERY");

    function switchTab(params: any) {
        currentTab.value = params.target.innerText
    }
</script>

<style scoped>
  .margin {
    margin: 5px 10px 5px 10px;
  }
  div.center {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  i.center {
    margin-left: -5px;
  }
  .logo {
    height: 40px;
    margin: 10px;
  }
  .vcenter {
    margin-top: auto;
    margin-bottom: auto;
  }
  .activeTab {
    font-weight: bold;
  }
  .container {
    height: 100%;
  }
  .column {
    display: flex;
    flex-flow: column wrap;
  }
  .spread {
    display: flex;
    justify-content: space-between;
  }
  .row {
    display: flex;
    flex-flow: row wrap;
  }
  .icon {
    color: white;
    background-color: #323b4b;
    font-size: 24px;
  }
  .settings-menu {
    min-width: 300px;
    margin: 5px;
  }
  .input {
    width:275px;
    flex: 0 1 auto;
  }
  .users-container {
    color: white;
    font-size: 24px;
  }
  .users {
    color: white;
    font-size: 28px;
  }
  .button-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
  }
  .leave-button {
    margin-left: auto;
    background-color: red;
    color: white;
  }
  .tab-container {
    display: flex;
    flex-flow: column wrap;
    align-content: center;
  }
  .basic-flex {
    display: flex;
  }
  .even-spacing {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
  }
  .video-container {
    display: flex;
    margin: 10px 5px;
  }
  .controls-container {
    display: flex;
    justify-content: space-between;
    position: sticky;
    bottom: 10px;
  }
  .button {
    color: white;
    background-color: rgba(3,1,28,.8);
    font-size: 20px;
    height: 36px;
    width: 36px;
  }
  .align-left {
     margin-right: auto;
  }
  .align-right {
    margin-left: auto;
  }
  .row-center {
    display: flex;
    justify-content: center;
    width: fit-content;
  }
  .chat-container {
    height: 545px;
    background-color: white;
    margin-bottom: 20px;
    border-radius: 5px;
    margin-right: 3px;
    margin-left: 3px;
    width: 90%;
  }
  .chat-header {
    border-bottom: 3px solid black;
    display: flex;
    justify-content: center;
  }
  .chat-body {
    height: 450px;
  }
  .chat-footer {
    display: flex;
    position: relative;
    flex-direction: row;
    width: 100%;
  }
  .chat-input {
    width: 230px;
  }
  .chat-button {
    float: right;
    color: white;
    background-color: blue;
    position: absolute;
    bottom: 5px;
    right: 5px
  }
  .tab-buttons {
    display: flex;
    position: absolute;
    bottom: 5px;
    width: 100%;
  }
  .tabs {
    width: 100%;
    background-color: white;
  }
</style>