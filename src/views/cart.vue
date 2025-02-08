<template>
  <div>
    <Navbar />
    <div class="cart-container">
      <h2>Your Shopping Cart</h2>
      <div v-if="cartItems.length === 0">Your cart is empty.</div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="" class="item-img" />
          <div class="item-info">
            <h4>{{ item.title }}</h4>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Price: \${{ item.price }}</p>
            <button @click="remove(item.id)" class="btn-remove">Remove</button>
          </div>
        </div>
        <div class="total">
          <h3>Total: \${{ totalPrice.toFixed(2) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/Cart'
import Navbar from '../components/Navbar.vue'
import { computed } from 'vue'

export default {
  name: 'Cart',
  components: { Navbar },
  setup() {
    const cartStore = useCartStore()
    const cartItems = computed(() => cartStore.items)
    const totalPrice = computed(() => cartStore.totalPrice)
    const remove = (id) => cartStore.removeFromCart(id)
    return { cartItems, totalPrice, remove }
  },
}
</script>

<style scoped>
.cart-container {
  padding: 20px;
}
.cart-item {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
.item-img {
  max-width: 100px;
  margin-right: 15px;
}
.btn-remove {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.total {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
