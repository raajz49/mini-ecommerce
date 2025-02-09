<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo">Mini E-Commerce</router-link>
    </div>

    <div class="navbar-center">
      <SearchBar v-model="searchStore.searchQuery" class="search-bar" />
    </div>

    <ul class="nav-links">
      <template v-if="userStore.user">
        <li class="user-info">
          <span>Welcome, {{ userStore.user.username || userStore.user.email }}</span>
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
import { useCartStore } from '../stores/Cart'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import { useSearchStore } from '../stores/searchStore' // Import Search Store

export default {
  name: 'Navbar',
  components: { SearchBar },
  setup() {
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const router = useRouter()
    const searchStore = useSearchStore() // Use the search store globally

    const logout = () => {
      const confirmed = window.confirm('Are you sure you want to logout?')
      if (confirmed) {
        userStore.logout()
        cartStore.items = [] // Clear the cart
        router.push('/') // Redirect to home
      }
    }

    return { userStore, logout, searchStore }
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensures space is distributed properly */
  padding: 15px 30px;
  background-color: #2196f3;
  color: #fff;
  gap: 20px; /* Adds spacing between elements */
}
.search-bar {
  width: 50%;
  /* padding: 8px; */
  /* border-radius: 5px; */
  /* border: 1px solid #ddd; */
  margin-top: 20px;
}
.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-center {
  flex: 1; /* Allows the search bar to take available space */
  display: flex;
  justify-content: center;
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
  align-items: center;
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
  color: #1976d2;
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 1rem;
}

/* Ensuring the search bar looks good */
.navbar-center input {
  width: 100%;
  max-width: 300px; /* Adjust size as needed */
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
