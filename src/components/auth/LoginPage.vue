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

<style>
.login-container {
  background: 
    linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), 
    url('src/assets/TEST.jpg') no-repeat center center / cover;
}
.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(255, 255, 255, 0.6); /* putih transparan 60% */
  z-index: 1;
}

/* Semua konten di atas overlay */
.content, .login-box, header, footer {
  position: relative;
  z-index: 2;
}
</style>

<style src="./LoginPage.css"></style>
