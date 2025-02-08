<template>
  <nav class="navbar">
    <router-link to="/" class="logo">Mini E-Commerce</router-link>
    <ul class="nav-links">
      <template v-if="userStore.user">
        <li class="user-info">
          <span>Welcome, {{ userStore.user.name || userStore.user.email }}</span>
        </li>
      </template>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/cart">Cart</router-link>
      </li>
      <template v-if="userStore.user">
        <li>
          <a href="#" @click.prevent="logout" class="link">Logout</a>
        </li>
      </template>
      <template v-else>
        <li>
          <router-link to="/login" class="link">Login</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
export default {
  name: 'Navbar',
  setup() {
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const router = useRouter()
    const logout = () => {
      const confirmed = window.confirm('Are you sure you want to logout?')
      if (confirmed) {
        userStore.logout()
        cartStore.items = [] // Clear the cart
        router.push('/') // Redirect to home
        // Optionally, redirect the user after logout:
        // this.$router.push('/')
      }
    }

    return { userStore, logout }
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2196f3; /* Using the blue color scheme */
  color: #fff;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
}

.nav-links li a:hover {
  color: #1976d2; /* Blue hover shade */
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 1rem;
}
</style>
