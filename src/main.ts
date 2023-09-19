/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import router from "./router"

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(router)

registerPlugins(app)

app.mount('#app')
