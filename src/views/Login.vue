<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="logo-container">
        <img src="@/assets/theraajz-logo.jpg" alt="Logo" class="logo" />
      </div>

      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Name:</label>
          <input type="name" v-model="name" required />
          <!-- for name validation with specific error -->
          <div class="error" v-if="nameError">{{ nameError }}</div>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="email" required />
          <!-- for email validation -->
          <div class="error" v-if="emailError">{{ emailError }}</div>
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>

        <button type="submit" class="btn">Login</button>
      </form>

      <!-- mock idea for signup and forgot-password -->
      <div class="links">
        <RouterLink to="/forgot-password" class="link">Forgot Password?</RouterLink>
        <span>|</span>
        <RouterLink to="/signup" class="link">Sign Up</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { RouterLink } from 'vue-router'

export default {
  name: 'Login',
  components: {
    RouterLink,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      nameError: null,
      emailError: null,
    }
  },
  methods: {
    handleLogin() {
      //error clearance
      this.nameError = null
      this.emailError = null

      //for empty string
      if (!this.name || !this.email || !this.password) {
        if (!this.name) this.nameError = 'Name is required.'
        if (!this.email) this.emailError = 'Email is required.'
        return
      }

      //validate name
      const namePattern = /^[A-Za-z\s]+$/
      if (this.name.length < 3 || !namePattern.test(this.name)) {
        this.nameError = 'Please enter a valid name'
        return
      }

      //libraryless validation for email using simple regrex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(this.email)) {
        this.emailError = 'Please enter a valid email address.'
        return
      }
      const userStore = useUserStore()
      if (this.email && this.password) {
        userStore.login({ name: this.name, email: this.email })
        this.$router.push('/')
      } else {
        this.error = 'All the fields are required.'
      }
    },
  },
}
</script>

<style scoped>
/* Center the login container */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Login container styling */
.login-container {
  width: 350px;
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Logo styling */
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

/* Form group styling */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

/* Button styling */
.btn {
  display: block; /* Make sure the button is block-level */
  width: 100%; /* Full width */
  box-sizing: border-box; /* Include padding and border in the width */
  background: linear-gradient(45deg, #2196f3, #1976d2);
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.btn:hover {
  background: linear-gradient(45deg, #1976d2, #2196f3);
}

/* Links styling */
.links {
  margin-top: 15px;
  font-size: 14px;
}

.link {
  color: #1976d2;
  text-decoration: none;
  margin: 0 5px;
  transition: color 0.3s ease;
}

.link:hover {
  color: #0d47a1;
}

/* Error message styling */
.error {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}
</style>
