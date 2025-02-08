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
            <p>
              Quantity: <strong>{{ item.quantity }}</strong>
            </p>
            <p>Price: \${{ item.price }}</p>
            <CButton variant="destructive" size="sm" @click="remove(item.id)">❌ Remove</CButton>
          </div>
        </div>
        <div class="cart-summary">
          <h3>
            Total: <span>\${{ totalPrice.toFixed(2) }}</span>
          </h3>
          <CButton variant="primary" size="lg">Proceed to Checkout</CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/Cart'
import Navbar from '../components/Navbar.vue'
import { computed } from 'vue'
import CButton from '../components/CButton.vue'

export default {
  name: 'Cart',
  components: { Navbar, CButton },
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
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.cart-title {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.item-img {
  max-width: 100px;
  border-radius: 8px;
}

.item-info {
  flex: 1;
}

.cart-summary {
  margin-top: 20px;
  text-align: center;
}

.cart-summary h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.cart-summary span {
  font-weight: bold;
  color: #007bff;
}
.total {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
