<template>
  <v-img src="@/assets/logo.svg" class="logo"/>

  <div class="col center">
    <div>
      <div>
        <div class="header margin"><h2>Preview</h2></div>
      </div>
      <div class="basic-flex" :class="store.state.localMedia ? '' : 'empty-video'">
        <Video 
        :userCount=1
        class="margin"
        :local-video="store.state.localMedia"></Video>
      </div>
    </div>
    <div>
      <div>
        <div class="header margin"><h2>Setup</h2></div>
      </div>

      <v-form class="settings-menu margin" @submit="joinCall" @submit.prevent="joinCall">
        <div class="row">
          <v-text-field
            label="Display Name"
            class="margin input"
            hide-details="auto"
            :rules="[v => !!v || 'This field is Required']"
            v-model="displayName"></v-text-field>
        </div>
        <div class="row">
          <v-text-field
            label="Channel ID"
            class="margin input"
            hide-details="auto"
            :rules="[v => !!v || 'This field is Required']"
            v-model="channelId"></v-text-field>
        </div>
        <div class="row">
          <v-select
            label="Camera"
            class="margin input"
            hide-details="auto"
            :items="store.state.cameraList"
            item-title="name"
            item-value="id"
            v-model="store.state.activeVideoDevice"
            @update:model-value="store.commit('changeCamera')"></v-select>
          <v-btn class="margin button"
            icon
            @click="store.commit('toggleLocalVideoMute')">
              <i class="center" :class="store.state.videoMuted ? 'icon-video-slash' : 'icon-video'"/>
          </v-btn>
        </div>
        <div class="row">
          <v-select
            label="Microphone"
            class="margin  input"
            hide-details="auto"
            :items="store.state.microphoneList"
            item-title="name"
            item-value="id"
            v-model="store.state.activeAudioDevice"
            @update:model-value="store.commit('changeMicrophone')"></v-select>
          <v-btn class="margin button"
            icon
            @click="store.commit('toggleLocalAudioMute')">
              <i class="center" :class="store.state.audioMuted ? 'icon-audio-mic-slash' : 'icon-audio-mic'"/>
          </v-btn>
        </div>
        <div class="row">
          <v-btn class="margin center join-button" type="submit">Join</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { useRouter, useRoute } from "vue-router";
    import Video from "./Video.vue";
    import liveSwitch from 'fm.liveswitch';
    import { Ref, onMounted, ref, watch, inject } from "vue";
    import { useStore } from 'vuex';
    import * as mnemonicId from 'mnemonic-id'

    const liveSwitchPlugin: any = inject('liveSwitch');

    // setup some global access
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
  
    // setup reactive variable for local media
    let localMedia : Ref<liveSwitch.LocalMedia | undefined> = ref(undefined);

    // setup input values
    const displayName : Ref<string> = ref(mnemonicId.createNameId());
    const channelId : Ref<string> = ref("");

    if (route.params.channelId) {
      channelId.value = route.params.channelId as string;
    }
    else {
      channelId.value = Math.floor(Math.random() * 100000).toString()
    }

    updateURL();
      
    watch(channelId, updateURL);

    function updateURL() {
      router.push({name: 'Lobby', params: { channelId: channelId.value}})
    }

    // handler that validates form and switches to inCall screen
    async function joinCall(this: any, event: any) {
      // wait for form validation to complete
      const results = await event
      // only proceed if validation passes
      if (!results.valid) {  
        return;
      }
      // update global store with inputs
      store.commit('setChannelId', channelId.value)
      store.commit('setDisplayName', displayName.value)
      // navigate to inCall screen
      router.push('/inCall');
    }

    onMounted(async () => {
      const media = await liveSwitchPlugin.startLocalMedia();
      localMedia.value = media;
      store.commit('setLocalMedia', media)
      onLocalMediaReady(media);
      
    })

    const onLocalMediaReady = function (media: liveSwitch.LocalMedia) {
      store.commit('setLocalMedia', media)

      store.commit('populateCameraList')
      store.commit('populateMicrophoneList')

      store.commit('setActiveVideoDevice', media.getVideoSourceInput().getId());
      store.commit('setActiveAudioDevice', media.getAudioSourceInput().getId());

      
      store.commit('setVideoMuted', media.getVideoMuted());
      store.commit('setAudioMuted', media.getAudioMuted());
    }
</script>