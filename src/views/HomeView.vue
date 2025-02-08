<template>
  <div>
    <Navbar />
    <div class="container">
      <SearchBar v-model="searchQuery" />

      <!-- Show loader while fetching products -->
      <Loader v-if="loading" />

      <!-- When not loading, display content -->
      <div v-else>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else-if="searchQuery && filteredProducts.length === 0" class="error">
          No products found.
        </div>
        <div v-else class="product-grid">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'
import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'
import Loader from '../components/Loader.vue'

export default {
  name: 'Home',
  components: { ProductCard, Navbar, SearchBar, Loader },
  data() {
    return {
      products: [],
      searchQuery: '',
      error: null,
      loading: true, // loading state for API call
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
      // await new Promise((resolve) => setTimeout(resolve, 5000))
      const res = await axios.get('https://fakestoreapi.com/products')
      this.products = res.data
    } catch (err) {
      this.error = 'Failed to load products. Please try again later.'
    } finally {
      this.loading = false
    }
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.error {
  color: red;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
</style>
