<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>PPSDM MIGAS</h3>
      </div>
      <div class="footer-section contact-info">
        <p>Jl. Sorogo No.1, Karangboyo, Kec. Cepu, Kabupaten Blora, Jawa Tengah 58315, Indonesia</p>
        <p>info.ppsdm.migas@esdm.go.id</p>
        <p>082328434329 (pelayanan terpadu)</p>
      </div>
      <div class="footer-section copyright">
        <p>&copy; 2021 BLU PROMiSe - PPSDM MIGAS</p>
      </div>
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
  background-color: #f5f5f5;
  color: #333;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-section {
  margin-bottom: 15px;
}

.footer-section h3 {
  color: #0066cc;
  margin-bottom: 10px;
}

.contact-info p {
  margin: 5px 0;
  font-size: 13px;
}

.copyright {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-section {
    margin-bottom: 20px;
  }
}
</style>