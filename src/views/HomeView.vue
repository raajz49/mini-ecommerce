<template>
  <div>
    <Navbar />
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
  </div>
</template>

<!-- <script>
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'
import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'
import Loader from '../components/Loader.vue'
import { useSearchStore } from '../stores/searchStore'

export default {
  name: 'Home',
  components: { ProductCard, Navbar, SearchBar, Loader },
  data() {
    return {
      products: [],
      searchQuery: '',
      error: null,
      loading: true, // loading state for API call
      searchStore: useSearchStore(),
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
</script> -->
<script>
import { ref, watch } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'
import Navbar from '../components/Navbar.vue'
import Loader from '../components/Loader.vue'
import { useSearchStore } from '../stores/searchStore'

export default {
  name: 'Home',
  components: { ProductCard, Navbar, Loader },
  setup() {
    const searchStore = useSearchStore()
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    // return { searchStore }

    // data() {
    //   return {
    //     products: [],
    //     error: null,
    //     loading: true, // Loading state for API call
    //     // searchStore: useSearchStore(),
    //   }
    // },
    // computed: {
    //   filteredProducts() {
    //     const query = this.searchStore.searchQuery.toLowerCase()
    //     return this.products.filter(
    //       //search according to the title or the name and category as well
    //       (p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query),
    //     )
    //   },
    // },
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
