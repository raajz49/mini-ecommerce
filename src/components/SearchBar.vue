<template>
  <div class="search-bar-container">
    <!-- Inline SVG for magnifying glass icon -->
    <i class="fa fa-search search-icon"></i>
    <input
      type="text"
      :value="localValue"
      @input="handleInput"
      placeholder="Search products..."
      :class="['search-input', theme === 'mobile' ? 'dark-gray' : '']"
    />
    <!-- Clear button appears only when there is text -->
    <button v-if="localValue" class="clear-btn" @click="clearSearch">&times;</button>
  </div>
</template>

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
    //props for theme of searchbar
    theme: {
      type: String,
      default: 'default',
    },
  },
  setup(props, { emit }) {
    const searchStore = useSearchStore()
    const localValue = ref(searchStore.searchQuery)

    //debouce to sync with api on every keystrokes
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

    //this will clear the search input so user can search other products easily

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
  padding: 10px 10px 10px 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* adjusting according to the size */
.dark-gray {
  background-color: darkgray;
  color: black;
  border-color: darkgray;
  font-size: 18px;
}
.dark-gray::placeholder {
  font-size: 18px;
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
