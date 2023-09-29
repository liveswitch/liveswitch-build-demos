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
  ls.Log.registerProvider(new ls.ConsoleLogProvider(ls.LogLevel.Debug));
const app = createApp(App)

app.use(store)

registerPlugins(app)

app.mount('#app')
