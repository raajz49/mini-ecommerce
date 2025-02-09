import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(product, qty = 1) {
      const existingItem = this.items.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += qty
      } else {
        this.items.push({ ...product, quantity: qty })
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
  },

  //to store the items in cart
  persist: true,
})
