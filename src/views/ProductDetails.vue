<template>
  <div>
    <Navbar />
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="details-container">
      <img :src="product.image" :alt="product.title" class="detail-img" />
      <div class="detail-info">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Price:</strong> \${{ product.price }}</p>
        <button @click="addToCart(product)" class="btn">Add to Cart</button>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from 'axios'
import { useCartStore } from '../stores/Cart'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'ProductDetails',
  components: { Navbar },
  data() {
    return {
      product: null,
      error: null,
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
    addToCart(product) {
      const cartStore = useCartStore()
      cartStore.addToCart(product)
    },
  },
}
</script>

<style scoped>
.details-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
.detail-img {
  max-width: 300px;
  width: 100%;
  margin-right: 20px;
}
.detail-info {
  flex: 1;
}
.btn {
  background: #42b983;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  padding: 20px;
}
</style>
