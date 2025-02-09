import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

//for the persistence plugin to store the login information
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(PrimeVue)
app.use(ConfirmationService)
app.use(pinia)
app.use(Toast, { position: POSITION.TOP_RIGHT })

app.component('ConfirmDialog', ConfirmDialog)

app.mount('#app')
