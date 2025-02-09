<template>
  <div>
    <!-- imported the navbar -->
    <Navbar />

    <!-- for creating a proper Shopping cart with overall information about price and quantity -->
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

            <!-- Cbutton to remove unwanted products on cart -->
            <CButton variant="destructive" size="sm" @click="confirmRemove(item.id)"
              >❌ Remove</CButton
            >
          </div>
        </div>

        <!-- displays the overall price of the items in the Cart -->
        <div class="cart-summary">
          <h3>
            Total: <span>\${{ totalPrice.toFixed(2) }}</span>
          </h3>
          <CButton variant="primary" size="lg">Proceed to Checkout</CButton>
        </div>
      </div>
    </div>

    <!-- remove items only after the confirmation -->
    <ConfirmDialog
      :show="showConfirmDialog"
      message="Are you sure you want to remove this item from your cart?"
      @confirm="removeItem"
      @cancel="cancelRemove"
    />
  </div>
</template>

<script>
import { useCartStore } from '../stores/Cart'
import Navbar from '../components/Navbar.vue'
import { computed, ref } from 'vue'
import CButton from '../components/CButton.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

export default {
  name: 'Cart',
  components: { Navbar, CButton, ConfirmDialog },
  setup() {
    const cartStore = useCartStore()
    const cartItems = computed(() => cartStore.items)
    const totalPrice = computed(() => cartStore.totalPrice)
    const showConfirmDialog = ref(false)
    const itemToRemove = ref(null)

    //removes the items according to its id
    const confirmRemove = (id) => {
      itemToRemove.value = id
      showConfirmDialog.value = true
    }

    const removeItem = () => {
      if (itemToRemove.value !== null) {
        cartStore.removeFromCart(itemToRemove.value)
        itemToRemove.value = null
      }
      showConfirmDialog.value = false
    }
    //used in the dialog box in the cancel section
    const cancelRemove = () => {
      itemToRemove.value = null
      showConfirmDialog.value = false
    }

    return { cartItems, totalPrice, confirmRemove, showConfirmDialog, removeItem, cancelRemove }
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
