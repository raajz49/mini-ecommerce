<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="logo-container">
        <img src="@/assets/theraajz-logo.jpg" alt="Logo" class="logo" />
      </div>

      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" v-model="username" required />
          <!-- for name validation with specific error -->
          <!-- <div class="error" v-if="nameError">{{ nameError }}</div> -->
        </div>
        <!-- <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="email" required />
          <div class="error" v-if="emailError">{{ emailError }}</div>
        </div> -->

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
      <div class="error" v-if="loginError">{{ loginError }}</div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/Cart'
import { useRouter, RouterLink } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  name: 'Login',
  components: {
    RouterLink,
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const loginError = ref(null)
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const toast = useToast()
    const router = useRouter()

    const handleLogin = async () => {
      //for error clearance
      loginError.value = null

      //for basic validation
      if (!username.value || !password.value) {
        loginError.value = 'Username and Password are required.'
        return
      }
      try {
        // Credential post to the api login end point so only the authenticated user can use it
        const response = await axios.post(
          'https://fakestoreapi.com/auth/login',
          JSON.stringify({
            username: username.value,
            password: password.value,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (response.data && response.data.token) {
          // On successful login, store the token (and any desired user data) in your store.
          userStore.login({ username: username.value, token: response.data.token })
          // Check for any pending cart items saved in localStorage
          let pendingCart = JSON.parse(localStorage.getItem('pendingCart') || '[]')
          if (pendingCart.length > 0) {
            pendingCart.forEach((item) => {
              cartStore.addToCart(item.product, item.quantity)
            })
            localStorage.removeItem('pendingCart')
            toast.success('Pending cart items added to your cart!')
          }
          router.push('/')
        } else {
          loginError.value = 'Invalid credentials. Please try again.'
        }
      } catch (err) {
        loginError.value = 'Invalid credentials. Please try again.'
      }
    }

    return { username, password, handleLogin, loginError }
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
