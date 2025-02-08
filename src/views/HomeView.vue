<template>
  <div>
    <Navbar />
    <div class="container">
      <input v-model="searchQuery" placeholder="Search products..." class="search-bar" />
      <div v-if="error" class="error">{{ error }}</div>
      <div class="product-grid">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: { ProductCard, Navbar },
  data() {
    return {
      products: [],
      searchQuery: '',
      error: null,
    }
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase()
      return this.products.filter(
        (p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query),
      )
    },
  },
  async created() {
    try {
      const res = await axios.get('https://fakestoreapi.com/products')
      this.products = res.data
    } catch (err) {
      this.error = 'Failed to load products. Please try again later.'
    }
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.search-bar {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.error {
  color: red;
}
</style>
