<template>
  <div class="overlay">
    <div class="login-box">
      <h2>Hi, {{ role }}!</h2>
      <div class="form-group">
        <input type="text" placeholder="USERNAME" />
      </div>
      <div class="form-group">
        <input type="email" placeholder="EMAIL" />
      </div>
      <div class="form-group password-group">
        <input :type="showPassword ? 'text' : 'password'" placeholder="PASSWORD" />
        <span class="toggle-password" @click="togglePassword">👁</span>
      </div>
      <p class="forgot">Forgot your password? <a href="#">Click here</a></p>
      <button class="login-button">Login</button>
      <button class="close-button" @click="$emit('close')">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  props: ['role'],
  data() {
    return {
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.login-box {
  background-color: #ffcc00;
  padding: 30px;
  border-radius: 30px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
}

.login-box h2 {
  margin-bottom: 20px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.forgot {
  font-size: 12px;
  margin: 10px 0;
}

.forgot a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.login-button {
  padding: 10px 20px;
  background: white;
  color: black;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
