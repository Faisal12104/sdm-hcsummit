<template>
  <header class="app-header">
    <div class="header-content">
      <img src="@/assets/images/logo-migas.png" alt="Logo PPSDM MIGAS" class="logo">
      <div class="header-title">
        <h1>BLU PROMiSe</h1>
        <p>Metering System Oil & Gas</p>
      </div>
      <div class="header-date">
        <p>PPSDM MIGAS 4-6 Mei 2021</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  background-color: #0066cc;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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

.header-title h1 {
  margin: 0;
  font-size: 24px;
}

.header-title p {
  margin: 5px 0 0;
  font-size: 14px;
}

.header-date p {
  margin: 0;
  font-size: 14px;
  font-style: italic;
}
</style>