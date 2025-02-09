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






<!-- <template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo">Mini E-Commerce</router-link>
    </div>

    <div class="navbar-center">
      <SearchBar v-model="searchStore.searchQuery" class="search-bar" />
    </div>

    <!-- Hamburger Menu Button (Visible on Mobile) -->
    <button class="hamburger" @click="toggleMenu">
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
    </button>

    <!-- Navigation Links -->
    <ul :class="['nav-links', { 'nav-open': menuOpen }]">
      <template v-if="userStore.user">
        <li class="user-info">
          <span>Welcome, {{ userStore.user.name || userStore.user.email }}</span>
        </li>
      </template>
      <li><router-link to="/" @click="closeMenu">Home</router-link></li>
      <li><router-link to="/cart" @click="closeMenu">Cart</router-link></li>
      <template v-if="userStore.user">
        <li><a href="#" @click.prevent="logout" class="link">Logout</a></li>
      </template>
      <template v-else>
        <li><router-link to="/login" class="link" @click="closeMenu">Login</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { ref } from 'vue'
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
    const menuOpen = ref(false) // Track menu state

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    const logout = () => {
      const confirmed = window.confirm('Are you sure you want to logout?')
      if (confirmed) {
        userStore.logout()
        cartStore.items = [] // Clear the cart
        router.push('/') // Redirect to home
        closeMenu() // Close the menu after logout
      }
    }

    return { userStore, logout, searchStore, menuOpen, toggleMenu, closeMenu }
  },
}
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #2196f3;
  color: #fff;
  position: relative;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

/* Center Search Bar */
.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-bar {
  width: 100%;
  max-width: 250px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

/* Nav Links */
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

/* Hamburger Menu Button */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background: #fff;
  transition: 0.3s;
}

/* Transform hamburger into "X" when open */
.hamburger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 60px;
    right: 0;
    width: 200px;
    background: #2196f3;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 100;
  }

  .nav-links.nav-open {
    transform: translateX(0);
  }
}
</style> -->
