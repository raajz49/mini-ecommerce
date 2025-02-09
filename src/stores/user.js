import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // stores user details
    isLoggedIn: false, // tracks the login status
  }),
  actions: {
    login(userData) {
      this.user = userData // save the user details
      this.isLoggedIn = true
    },
    logout() {
      this.user = null // clear user details
      this.isLoggedIn = false
    },
  },
  persist: true,
})
