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
                style="margin: 5px;"
                :userCount="userCount"
                v-for="video in videos"
                :userName=video> </Video>
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
    import { Ref,ref } from "vue";
    import { useDisplay } from 'vuetify'
    import { useRouter } from "vue-router";
    import Video from "./Video.vue"

    const router = useRouter();

    function leaveCall() {
        router.push('/');
    }

    // Destructure only the keys you want to use
    const { mobile } = useDisplay();
    const isPortrait: Ref<boolean> = ref(mobile && window.innerHeight > window.innerWidth);

    const videos : string[] = ['Me', 'User 2', 'User 3', 'User 4'];
    var userCount : Ref<number> = ref(videos.length);
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