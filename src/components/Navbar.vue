<template>
  <nav class="navbar">
    <div class="navbar-left">
      <!-- for responsive mobile-nav -->
      <button v-if="isMobile" class="hamburger" @click="showMobileNav = true">☰</button>

      <!-- logo for large screen -->
      <img v-if="!isMobile" src="@/assets/theraajz-logo.jpg" alt="Logo" class="logo-img" />
      <router-link to="/" class="logo">The-Raajz </router-link>
    </div>

    <div class="navbar-center" v-if="!isMobile">
      <SearchBar v-model="searchStore.searchQuery" class="search-bar" />
    </div>

    <ul class="nav-links" v-if="!isMobile">
      <!-- for the large-screen nav -->
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
    <MobileNav :isOpen="showMobileNav" @close="showMobileNav = false" />

    <!-- confirmdialog resued here -->
    <ConfirmDialog
      :show="showConfirmDialog"
      :message="confirmMessage"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/Cart'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import { useSearchStore } from '../stores/searchStore'
import MobileNav from './MobileNav.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { useToast } from 'vue-toastification'
export default {
  name: 'Navbar',
  components: { SearchBar, MobileNav, ConfirmDialog },
  setup() {
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const router = useRouter()
    const searchStore = useSearchStore()
    const isMobile = ref(false)
    const showMobileNav = ref(false)
    const showConfirmDialog = ref(false)
    const confirmMessage = ref('')
    const toast = useToast()

    //check for the responsiveness to provide the mobile or normal navbar

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile)
    })

    // const logout = () => {
    //   const confirmed = window.confirm('Are you sure you want to logout?')
    //   if (confirmed) {
    //     userStore.logout()
    //     cartStore.items = [] // Clear the cart
    //     router.push('/') // Redirect to home
    //   }
    // }
    const logout = () => {
      confirmMessage.value = 'Are you sure you want to logout?'
      showConfirmDialog.value = true
    }

    const onConfirm = () => {
      userStore.logout()
      cartStore.items = [] // Clear the cart
      router.push('/') // Redirect to home
      showConfirmDialog.value = false
      toast.warning('You have been logged out successfully.')
    }

    const onCancel = () => {
      showConfirmDialog.value = false
    }

    return {
      userStore,
      logout,
      searchStore,
      isMobile,
      showMobileNav,
      showConfirmDialog,
      confirmMessage,
      onConfirm,
      onCancel,
    }
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  background-color: #2196f3;
  color: #fff;
  gap: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
@media (max-width: 768px) {
  .navbar {
    padding: 10px 30px;
  }
  .hamburger {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    margin-right: 15px;
    padding: 5px;
    cursor: pointer;
  }
}
.search-bar {
  width: 50%;
  margin-top: 20px;
}

.navbar-center {
  flex: 1; /* Allows the search bar to take available space */
  display: flex;
  justify-content: center;
}
.navbar-left {
  display: flex;
  align-items: center; /* Align logo and text vertically */
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center; /* Ensure text aligns with the logo */
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

/* Ensuring the adjustable searchbar in the middle of the navbar */
.navbar-center input {
  width: 100%;
  max-width: 300px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
