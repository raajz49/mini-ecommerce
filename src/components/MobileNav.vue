<template>
  <transition name="slide">
    <!-- for navopen -->
    <div v-if="isOpen" class="mobile-nav">
      <div class="mobile-nav-header">
        <!-- to close nav -->
        <button @click="close" class="close-btn">&times;</button>
      </div>

      <!-- Centered rounded logo -->
      <div class="logo-container">
        <img src="@/assets/theraajz-logo.jpg" alt="Logo" class="mobile-logo" />
      </div>

      <div class="mobile-nav-content">
        <div class="user-info" v-if="userStore.user">
          <span>Welcome, {{ userStore.user.username || userStore.user.email }}</span>
        </div>

        <!-- searchabar for mobilenave -->
        <SearchBar v-model="searchStore.searchQuery" class="mobile-search" />

        <router-link to="/" @click="close">Home</router-link>
        <router-link to="/cart" @click="close">Cart</router-link>

        <!-- logging out and logginin option -->

        <div v-if="userStore.user">
          <a href="#" @click.prevent="logout" class="link">Logout</a>
        </div>
        <div v-else>
          <router-link to="/login" @click="close" class="link">Login</router-link>
        </div>
      </div>
    </div>
  </transition>

  <!-- imported dialog component -->
  <ConfirmDialog
    :show="showConfirmDialog"
    :message="confirmMessage"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
  <transition name="fade">
    <div v-if="isOpen" class="backdrop" @click="close"></div>
  </transition>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/Cart'
import { useRouter } from 'vue-router'
import { useSearchStore } from '../stores/searchStore'
import SearchBar from './SearchBar.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { useToast } from 'vue-toastification'

export default {
  props: ['isOpen'],
  emits: ['close'],
  components: { ConfirmDialog, SearchBar },
  setup(props, { emit }) {
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const router = useRouter()
    const searchStore = useSearchStore()
    const showConfirmDialog = ref(false)
    const confirmMessage = ref('')
    const toast = useToast()

    const close = () => emit('close')

    // function to work with the logout button
    const logout = () => {
      confirmMessage.value = 'Are you sure you want to logout?'
      showConfirmDialog.value = true
    }

    //used in the imported comfirmdialog
    const onConfirm = () => {
      userStore.logout()
      cartStore.items = [] // Clear the cart
      router.push('/') // Redirect to home
      showConfirmDialog.value = false
      toast.warning('You have been logged out successfully.')
      //closes the sidenavbar
      close()
    }

    const onCancel = () => {
      showConfirmDialog.value = false
    }

    return {
      userStore,
      logout,
      searchStore,
      close,
      showConfirmDialog,
      confirmMessage,
      onConfirm,
      onCancel,
    }
  },
}
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: #375b7f;
  z-index: 1000;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.mobile-nav-header {
  display: flex;
  justify-content: flex-end;
  /* margin-bottom: 20px; */
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

/* making logo rounded and centered*/

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.mobile-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.mobile-nav-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mobile-nav-content a {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  padding: 10px;
  transition: background-color 0.3s;
}

.mobile-nav-content a:hover {
  background-color: #1976d2;
}

.mobile-search {
  margin-top: 20px;
  width: 100%;
}

/* Transitions added for the drawer in mobile nav */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
