<template>
  <div class="search-bar-container">
    <!-- Inline SVG for magnifying glass icon -->
    <svg
      class="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.742 10.344a6.5 6.5 0 1 0-1.398 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
      />
    </svg>
    <input
      type="text"
      :value="localValue"
      @input="handleInput"
      placeholder="Search products..."
      class="search-input"
    />
    <!-- Clear button appears only when there is text -->
    <button v-if="localValue" class="clear-btn" @click="clearSearch">&times;</button>
  </div>
</template>

<!-- <script>
import { ref, watch } from 'vue'
import { useSearchStore } from '../stores/searchStore'

export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const searchStore = useSearchStore()
    const localValue = ref(props.modelValue)
    let debounceTimer = null

    // Watch for external changes to modelValue
    watch(
      () => props.modelValue,
      (newVal) => {
        localValue.value = newVal
      },
    )

    // Watch for changes in the search store
    watch(
      () => searchStore.searchQuery,
      (newVal) => {
        localValue.value = newVal
      },
    )

    const handleInput = (event) => {
      localValue.value = event.target.value

      // Clear existing debounce timer
      if (debounceTimer) clearTimeout(debounceTimer)

      // Set new debounce timer (500ms)
      debounceTimer = setTimeout(() => {
        emit('update:modelValue', localValue.value)
        searchStore.searchQuery = localValue.value // Sync with store
      }, 500)
    }

    const clearSearch = () => {
      localValue.value = ''
      emit('update:modelValue', '')
      searchStore.searchQuery = ''
      if (debounceTimer) clearTimeout(debounceTimer)
    }

    return { localValue, handleInput, clearSearch }
  },
}
</script> -->
<script>
import { ref, watch } from 'vue'
import { useSearchStore } from '../stores/searchStore'

export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const searchStore = useSearchStore()
    const localValue = ref(searchStore.searchQuery)
    const debounceTimer = ref(null) // Use ref to persist debounce timer

    watch(
      () => searchStore.searchQuery,
      (newVal) => {
        localValue.value = newVal
      },
    )

    const handleInput = (event) => {
      localValue.value = event.target.value

      // Clear existing debounce timer
      if (debounceTimer.value) clearTimeout(debounceTimer.value)

      // Set new debounce timer (500ms)
      debounceTimer.value = setTimeout(() => {
        emit('update:modelValue', localValue.value)
        // searchStore.searchQuery = localValue.value // Sync with store
      }, 500)
    }

    const clearSearch = () => {
      localValue.value = ''
      emit('update:modelValue', '')
      searchStore.searchQuery = ''
      if (debounceTimer.value) clearTimeout(debounceTimer.value)
    }

    return { localValue, handleInput, clearSearch }
  },
}
</script>

<style scoped>
.search-bar-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #888;
  width: 16px;
  height: 16px;
}
.search-input {
  width: 100%;
  padding: 10px 10px 10px 35px; /* extra left padding to accommodate the icon */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
  line-height: 1;
}
.clear-btn:hover {
  color: #333;
}
</style>
