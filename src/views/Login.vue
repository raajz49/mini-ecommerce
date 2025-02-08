<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    handleLogin() {
      const userStore = useUserStore()
      if (this.email && this.password) {
        userStore.login({ email: this.email })
        this.$router.push('/')
      } else {
        this.error = 'Both fields are required.'
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.btn {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
