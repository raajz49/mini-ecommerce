// stores/searchStore.js
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: '',
  }),
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query
    },
    clearSearch() {
      this.searchQuery = ''
    },
  },
})
