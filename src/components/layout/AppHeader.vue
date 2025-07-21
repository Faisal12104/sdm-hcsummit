<template>
  <header class="app-header">
    <div class="header-content">
      <img src="@/assets/logo_ppsdmmigas.png" alt="Logo PPSDM MIGAS" class="logo">
      <div class="navigation">
        <nav>
          <ul>
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>PRODUCT</li>
            <li>CONSULTATION</li>
          </ul>
        </nav>
      </div>
      <div class="login-dropdown">
    <button class="login-button"@click="toggleDropdown">
      LOGIN <span class="arrow">▼</span>
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li @click="openLogin('Superadmin')">SUPERADMIN</li>
      <li @click="openLogin('Admin Sektor')">ADMIN SEKTOR</li>
      <li @click="openLogin('Admin Eksternal')">ADMIN EKSTERNAL</li>
    </ul>
  </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  },
  openLogin(role) {
    this.$emit('open-login', role); // kirim event ke parent (Home.vue)
    this.isOpen = false; // tutup dropdown
  }
}
};
</script>

<style scoped>
.app-header {
  background-color: #ffcc00; /* Yellow background */
  color: black; /* Change text color */
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  height: 50px;
}

.navigation ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation li {
  margin: 0 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.login-dropdown {
  position: relative;
  display: inline-block;
}

.login-button {
  padding: 10px 15px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.login-button :hover{
  background-color: #000000;
  color: #f2f2f2;
}

.arrow {
  margin-left: 5px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: yellow;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 150px;
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
}

.dropdown-menu li {
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f2f2f2;
}
</style>