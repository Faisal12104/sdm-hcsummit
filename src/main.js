import { createApp } from 'vue'
import App from './App.vue'
import LoginPage from './components/auth/LoginPage.vue'

const app = createApp(App)
app.component('LoginPage', LoginPage)
app.mount('#app')

