<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <div class="container">
        <!-- <SearchBar v-model="searchQuery" /> -->

        <!-- Show loader while fetching products -->
        <Loader v-if="loading" />

        <!-- When not loading, display content -->
        <div v-else>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-else-if="searchStore.searchQuery && products.length === 0" class="error">
            No products found.
          </div>
          <div v-else class="product-grid">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Loader from '../components/Loader.vue'
import { useSearchStore } from '../stores/searchStore'

export default {
  name: 'Home',
  components: { ProductCard, Navbar, Loader, Footer },
  setup() {
    const searchStore = useSearchStore()
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    // return { searchStore }

    //fetches the overall products with the detail to be displayed and gives error message for anything wrong

    const fetchProducts = async (query) => {
      loading.value = true
      error.value = null
      try {
        const res = await axios.get('https://fakestoreapi.com/products')
        const allProducts = res.data
        if (query && query.trim() !== '') {
          products.value = allProducts.filter(
            (p) =>
              p.title.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()),
          )
        } else {
          products.value = allProducts
        }
      } catch (err) {
        error.value = 'Failed to load products. Please try again later.'
      } finally {
        loading.value = false
      }
    }
    // Watch for changes in the search query from the store.
    watch(
      () => searchStore.searchQuery,
      (newQuery) => {
        // Call the API (with each query change, debounced in the SearchBar component)
        fetchProducts(newQuery)
      },
      { immediate: true },
    )

    return { searchStore, products, loading, error }
  },
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

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
