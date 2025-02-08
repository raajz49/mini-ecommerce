import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog' // Import this!

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ConfirmationService)
app.use(createPinia())
app.use(Toast, { position: POSITION.TOP_RIGHT })

app.component('ConfirmDialog', ConfirmDialog) // Register it properly

app.mount('#app')
