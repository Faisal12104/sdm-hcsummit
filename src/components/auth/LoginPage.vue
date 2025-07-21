<template>
  <div class="login-page">
    <AppHeader @open-login="handleOpenLogin" />

    <main class="login-container">
      <h1 class="title">Bridging Your Success</h1>
    </main>

    <AppFooter />

    <!-- LoginBox muncul saat showLogin true -->
    <LoginBox 
      v-if="showLogin" 
      :role="selectedRole" 
      @close="showLogin = false"
    />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import LoginBox from '@/components/auth/LoginBox.vue'

export default {
  name: 'LoginPage',
  components: {
    AppHeader,
    AppFooter,
    LoginBox
  },
  data() {
    return {
      showLogin: false,
      selectedRole: ''
    }
  },
  methods: {
    handleOpenLogin(role) {
      console.log('Role diterima:', role)
      this.selectedRole = role
      this.showLogin = true
    }
  }
}
</script>

<style src="./LoginPage.css"></style>
