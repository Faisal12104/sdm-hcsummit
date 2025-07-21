<template>
  <div class="home-page">
    <Header @open-login="handleOpenLogin" />
    <div class="content">
      <h1>Metering System Oil & Gas</h1>
      <p>PPSDM MIGAS 4-6 Mei 2021</p>
    </div>
    <Footer />
    <LoginBox 
      v-if="showLogin" 
      :role="selectedRole" 
      @close="showLogin = false" 
    />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import LoginBox from '@/components/auth/LoginBox.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'HomePage',
  components: { Header, LoginBox, Footer },
  data() {
    return {
      showLogin: false,
      selectedRole: ''
    }
  },
  methods: {
    handleOpenLogin(role) {
      this.selectedRole = role
      this.showLogin = true
    }
  }
}
</script>

<style scoped>
.home-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: 
    linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), 
    url('@/assets/TEST.jpg') no-repeat center center / cover;
}



/* Overlay transparan */
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
