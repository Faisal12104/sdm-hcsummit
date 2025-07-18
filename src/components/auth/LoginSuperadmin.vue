<template>
  <div class="login-page">
    <AppHeader />
    
    <main class="login-container">
      <div class="login-card">
        <div class="login-separator"></div>

        <div class="login-form">
          <h3>LOGIN ▼</h3>
          <p class="tagline">Bridging Your Success</p>
          
          <!-- Tambahkan form login di sini -->
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <input 
                type="text" 
                v-model="username" 
                placeholder="Username" 
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="password" 
                v-model="password" 
                placeholder="Password" 
                required
              >
            </div>
            <button type="submit" class="login-button">Login</button>
          </form>
        </div>

        <div class="login-separator"></div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/Header.vue'
import AppFooter from '@/components/layout/Footer.vue'

export default {
  name: 'LoginSuperadmin',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // Implementasi login logic di sini
      console.log('Login attempted with:', this.username, this.password)
      // this.$router.push('/dashboard') // Contoh redirect setelah login
    }
  }
}
</script>

<style src="./LoginSuperadmin.css"></style>