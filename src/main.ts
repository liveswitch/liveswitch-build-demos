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

import router from "./router"

// Plugins
import { registerPlugins } from '@/plugins'

import "./assets/css/liveswitch.css"

// Create a new store instance.
const store = createStore({
    state () {
      return {
        localMedia: null,
        channelId: "",
        displayName: ""
      }
    },
    mutations: {
      setLocalMedia (state, localMedia) {
        state.localMedia = localMedia
      },
      setChannelId (state, channelId) {
        state.channelId = channelId
      },
      setDisplayName (state, displayName) {
        state.displayName = displayName
      }
    }
  })

const app = createApp(App)

app.use(router)
app.use(store)

registerPlugins(app)

app.mount('#app')
