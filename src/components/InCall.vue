<template>
    <div style="display: flex; height: 100%;">
        <div style="width: calc(100% - 400px);">
            <div style="display: flex; justify-content: center;">
                <v-img src="@/assets/logo.svg" class="logo"/>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 0px 10px;">
                <div style="color: white; font-size: 24px;">
                    <i class="icon-users" style="color: white; font-size: 28px;"/>
                    {{ userCount }}
                </div>
                <v-btn style="background-color: red;color: white;" @click="leaveCall">Leave Call</v-btn>
            </div>
            <div class="video-grid">
                <Video
                v-if="upstreamConnection"
                style="margin: 5px;"
                :userCount="userCount"
                :video="store.state.localMedia"
                userName="Me"> </Video>
                <!-- <Video
                v-if="downstreamConnections"
                style="margin: 5px;"
                :userCount="userCount"
                v-for="video in videos"
                :userName=video> </Video> -->
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
                    ></v-select>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;">
                        <i class="center icon-video"/>
                    </v-btn>
                </div>
                <div style="display: flex;">
                    <v-select
                        label="Microphone"
                        style="width:290px;"
                        class="margin input"
                        hide-details="auto"
                    ></v-select>
                    <v-btn class="margin" icon style="color: white; background-color: rgba(3,1,28,.8);font-size: 24px;">
                        <i class="center icon-audio-mic"/>
                    </v-btn>
                </div>
                <div>
                    <v-select
                    label="Speaker"
                    style="width:290px;"
                    class="margin input"
                    hide-details="auto"
                    ></v-select>
                </div>
            </div>
            <div style="background-color: ghostwhite; border-radius: 5px; margin: 10px;height: 60%; position: relative; top: 20px;">
                <div style="border-bottom: 2px solid black;">
                    <h2 class="margin">Chat</h2>
                </div>
                <div class="chat-body">
                </div>
                <div style="display: flex; position: absolute;bottom: 0; flex-direction: row; width: 100%;">
                    <v-text-field
                    label="Chat Message"
                    clearable
                    style="width: 280px;"
                    class="margin input"
                    hide-details="auto"
                    ></v-text-field>
                    <v-btn style="float: right;color: white; background-color: blue; position: absolute; bottom: 5px; right: 5px">Send</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
    import { Ref,ref,onMounted } from "vue";
    import { useDisplay } from 'vuetify'
    import { useRouter } from "vue-router";
    import Video from "./Video.vue"
    import { useStore } from 'vuex'
    import ls from 'fm.liveswitch'
    import config from '../../liveswitch_config.json'

    const store = useStore();
    console.log(store.state);

    let upstreamConnection: Ref<ls.SfuUpstreamConnection | undefined> = ref(undefined);
    let channel: ls.Channel | null = null;
    let client : ls.Client | null = null;

    let downstreamConnections: { [id: string] : ls.SfuDownstreamConnection; } = {};

    let layoutManager : ls.DomLayoutManager |  null = null;

    const router = useRouter();

    function leaveCall() {
        router.push('/');
    }

    // Destructure only the keys you want to use
    const { mobile } = useDisplay();
    const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);

    const videos : string[] = ['Me', 'User 2', 'User 3', 'User 4'];
    var userCount : Ref<number> = ref(videos.length);

    onMounted(async () => {
        const media = store.state.localMedia;
        
        await joinAsync();
        const videoContainer = document.getElementById("home");
        if (videoContainer && media) {
            layoutManager = new ls.DomLayoutManager(videoContainer);
            layoutManager.setLocalView(media.getView());
        }
    })

    async function joinAsync (this: any) {
            const promise = new ls.Promise();

            // Create a client.
            client = new ls.Client(config.gatewayUrl, config.applicationId);

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

        function onClientRegistered (this: any, channels: any) {
            // Store our channel reference.
            channel = channels[0];

            // Open a new SFU upstream connection.
            upstreamConnection.value = openSfuUpstreamConnection(store.state.localMedia);

            if (channel) {
            // Open a new SFU downstream connection when a remote upstream connection is opened.
                channel.addOnRemoteUpstreamConnectionOpen((remoteConnectionInfo) =>
                    openSfuDownstreamConnection(remoteConnectionInfo, channel)
                );
            }
        };

        function openSfuDownstreamConnection (remoteConnectionInfo: any, channel: ls.Channel | null) {
            // Create remote media.
            const remoteMedia = new ls.RemoteMedia();
            const audioStream = new ls.AudioStream(remoteMedia);
            const videoStream = new ls.VideoStream(remoteMedia);

            if (layoutManager) {
                // Add remote media to the layout.
                layoutManager.addRemoteMedia(remoteMedia);
            }

            if (channel) {
                // Create a SFU downstream connection with remote audio and video.
                const connection = channel.createSfuDownstreamConnection(
                    remoteConnectionInfo,
                    audioStream,
                    videoStream
                );

                // Store the downstream connection.
                downstreamConnections[connection.getId()] = connection;

                connection.addOnStateChange((conn) => {
                    // Remove the remote media from the layout and destroy it if the remote is closed.
                    if (conn.getRemoteClosed()) {
                        delete downstreamConnections[connection.getId()];
                        if (layoutManager) {
                            layoutManager.removeRemoteMedia(remoteMedia);
                        }
                        remoteMedia.destroy();
                    }
                });

                connection.open();
                return connection;
            }
        };

        function openSfuUpstreamConnection (localMedia: ls.LocalMedia) {
            // Create audio and video streams from local media.
            const audioStream = new ls.AudioStream(localMedia);
            const videoStream = new ls.VideoStream(localMedia);

            if (!channel) {
                return;
            }

            // Create a SFU upstream connection with local audio and video.
            const connection = channel.createSfuUpstreamConnection(
                audioStream,
                videoStream
            );

            connection.addOnStateChange((conn) => {
                ls.Log.debug(
                    `Upstream connection is ${new ls.ConnectionStateWrapper(
                        conn.getState()
                    ).toString()}.`
                );
            });

            connection.open();

            return connection;
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