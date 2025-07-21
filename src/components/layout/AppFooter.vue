<template>
  <footer class="app-footer">
    <div class="footer-item">
      <span class="icon">📍</span>
      <span>Jl. Sorogo No.1, Karangboyo, Kec. Cepu, Kabupaten Blora, Jawa Tengah 58315, Indonesia</span>
    </div>
    <div class="footer-item">
      <span class="icon">✉</span>
      <span>info.ppsdm.migas@esdm.go.id</span>
    </div>
    <div class="footer-item">
      <span class="icon">📞</span>
      <span>082328434329 (pelayanan terpadu)</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background-color: #ffcc00; /* warna kuning */
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* agar responsif di mobile */
  padding: 5px 15px;
  font-size: 15px;
}

.footer-item {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.icon {
  margin-right: 5px;
  font-size: 14px;
}
</style>
