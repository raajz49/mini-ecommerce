<template>
  <div>
    <Navbar />
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="details-container">
      <img :src="product.image" :alt="product.title" class="detail-img" />
      <div class="detail-info">
        <h2>{{ product.title }}</h2>
        <Rating :rating="product.rating.rate" :count="product.rating.count" />
        <p class="category"><strong>Category:</strong> {{ product.category }}</p>
        <p class="price"><strong>Price:</strong> ${{ product.price }}</p>
        <p class="description">{{ product.description }}</p>

        <!-- Quantity Selector -->
        <div class="quantity-selector">
          <button @click="decrementQuantity" :disabled="selectedQuantity <= 1">-</button>
          <span>{{ selectedQuantity }}</span>
          <button @click="incrementQuantity">+</button>
        </div>

        <!-- Add to Cart Button -->
        <CButton @click="handleAddToCart" variant="primary" size="md"> Add to Cart </CButton>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import axios from 'axios'
import { useCartStore } from '../stores/Cart'
import { useUserStore } from '../stores/user'
import Navbar from '../components/Navbar.vue'
import Loader from '../components/Loader.vue'
import CButton from '../components/CButton.vue'
import Rating from '../components/Rating.vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'ProductDetails',
  components: { Navbar, Loader, CButton, Rating },
  data() {
    return {
      product: null,
      error: null,
      selectedQuantity: 1,
      isAdding: false,
    }
  },
  async created() {
    try {
      const id = this.$route.params.id
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
      this.product = res.data
    } catch (err) {
      this.error = 'Failed to load product details.'
    }
  },
  methods: {
    incrementQuantity() {
      this.selectedQuantity++
    },
    decrementQuantity() {
      if (this.selectedQuantity > 1) {
        this.selectedQuantity--
      }
    },
    async handleAddToCart() {
      const authStore = useUserStore()
      if (!authStore.isLoggedIn) {
        // Redirect to login page if not authenticated
        this.$router.push({ name: 'Login' })
        return
      }
      this.isAdding = true
      const toast = useToast() // using Vue Toastification
      try {
        const cartStore = useCartStore()
        cartStore.addToCart(this.product, this.selectedQuantity)
        toast.success('Product added to cart successfully!', { timeout: 3000 })
      } catch (err) {
        toast.error('Failed to add product to cart.', { timeout: 3000 })
      } finally {
        this.isAdding = false
      }
    },
  },
}
</script>

<style scoped>
.details-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
.detail-img {
  max-width: 300px;
  width: 100%;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: contain; /* Ensures full image is visible */
}
.detail-info {
  flex: 1;
  padding: 10px;
}
.detail-info h2 {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #333;
}
.category,
.price {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #333;
}
.description {
  margin: 15px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
}
.quantity-selector {
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.quantity-selector button {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}
.quantity-selector span {
  margin: 0 10px;
  font-size: 1.1rem;
}
.error {
  color: red;
  padding: 20px;
  text-align: center;
  font-size: 1.2rem;
}
</style>
