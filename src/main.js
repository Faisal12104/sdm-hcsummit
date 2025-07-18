import { createApp } from 'vue'
import App from './App.vue'
import LoginSuperadmin from './components/auth/LoginSuperadmin.vue'

const app = createApp(App)
app.component('LoginSuperadmin', LoginSuperadmin)
app.mount('#app')