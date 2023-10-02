<template>
    <div style="display: flex; height: 100%;">
        <div style="width: calc(100% - 400px);">
            <div style="display: flex; justify-content: center;">
                <v-img src="@/assets/logo.svg" class="logo"/>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 0px 10px;">
                <div style="color: white; font-size: 24px;">
                    <i class="icon-users" style="color: white; font-size: 28px;"/>
                    {{ remoteCounter }}
                </div>
                <v-btn style="background-color: red;color: white;" @click="leaveCall">Leave Call</v-btn>
            </div>
            <div class="video-grid">
                <Video
                v-if="store.state.localMedia"
                style="margin: 5px;"
                :local-video="store.state.localMedia"
                userName="Me"> </Video>
                <Video
                v-if="downstreamConnections"
                style="margin: 5px;"
                v-for="value in downstreamConnections"
                :remoteVideo="value.media"
                :index="value.index"
                :userName="value.displayName"
                :connection="value.connection"> </Video>
            </div>
        </div>
        <div style="width: 400px; padding-top: 125px;">
            <div style="background-color: ghostwhite; border-radius: 5px; margin: 10px; padding: 5px 0px;">
                <div style="display: flex;">
                    <v-select
                        label="Camera"
                        style="width:290px;"
                        class="margin input"
                        hide-details="auto"
                        :items="cameraList"
                        item-title="name"
                        item-value="id"
                        v-model="activeCamera"
                        @update:model-value="changeCamera"
                    ></v-select>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;" @click="store.commit('toggleLocalAudioMute')">
                        <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
                    </v-btn>
                </div>
                <div style="display: flex;">
                    <v-select
                        label="Microphone"
                        style="width:290px;"
                        class="margin input"
                        hide-details="auto"
                        :items="micList"
                        item-title="name"
                        item-value="id"
                        v-model="activeMic"
                        @update:model-value="changeMicrophone"
                    ></v-select>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;" @click="store.commit('toggleLocalAudioMute')">
                        <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
                    </v-btn>
                </div>
                <div>
                    <v-select
                    label="Speaker"
                    style="width:290px;"
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
            <div style="background-color: ghostwhite; border-radius: 5px; margin: 10px;height: 60%; position: relative; top: 20px;">
                <div style="border-bottom: 2px solid black;">
                    <h2 class="margin">Chat</h2>
                </div>
                <div class="chat-body">
                    <div
                        v-for="value in messages">
                        {{ value.user }}: {{ value.message }}
                    </div>
                </div>
                <div style="display: flex; position: absolute;bottom: 0; flex-direction: row; width: 100%;">
                    <v-text-field
                    label="Chat Message"
                    clearable
                    style="width: 280px;"
                    class="margin input"
                    hide-details="auto"
                    v-model="chatMessage"
                    ></v-text-field>
                    <v-btn
                        style="float: right;color: white; background-color: blue; position: absolute; bottom: 5px; right: 5px"
                        @click="sendChat">
                            Send
                    </v-btn>
                </div>
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

    let cameraList: Ref<{name: string, id: string}[]> = ref([]);
    let micList: Ref<{name: string, id: string}[]> = ref([]);
    let speakerList: Ref<{name: string, id: string}[]> = ref([]);

    const activeCamera: Ref<string> = ref("");
    const activeMic: Ref<string> = ref("");
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

    function changeCamera (value: any) {
        // value is the ID of the input, need to parse through list and find the SourceInput object
        media.getVideoSourceInputs().then(function(inputs: any[]){
            // find matching object
            let videoSource = inputs.find((x: ls.SourceInput)=>{return x.getId() === value})
            if (videoSource) {
                //set object as new source
                media.changeVideoSourceInput(videoSource);
            }
        })
    }

    function changeMicrophone (value: any) {
        // value is the ID of the input, need to parse through list and find the SourceInput object
        media.getAudioSourceInputs().then(function(inputs: any[]){
            // find matching object
            let audioSource = inputs.find((x: ls.SourceInput)=>{return x.getId() === value})
            if (audioSource) {
                //set object as new source
                media.changeAudioSourceInput(audioSource);
            }
        })
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

        // get input devices data
        activeCamera.value = media.getVideoSourceInput().getId();
        activeMic.value = media.getAudioSourceInput().getId();
        media.getVideoSourceInputs().then(function(inputs: any){
            cameraList.value = inputs.map((x: ls.SourceInput)=>{return { name: x.getName(), id: x.getId()}})
        }).fail(function(ex: any){
            console.error(ex)
        });
        media.getAudioSourceInputs().then(function(inputs: any[]){
            micList.value = inputs.map((x: ls.SourceInput)=>{return { name: x.getName(), id: x.getId()}})
        }).fail(function(ex: any){
            console.error(ex)
        });

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
    }
</style>