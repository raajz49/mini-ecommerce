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

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: this.modelValue,
      debounceTimer: null,
    }
  },
  watch: {
    // Keep localValue in sync if modelValue changes externally
    modelValue(newVal) {
      this.localValue = newVal
    },
  },
  methods: {
    handleInput(event) {
      this.localValue = event.target.value

      // Clear any existing debounce timer
      if (this.debounceTimer) clearTimeout(this.debounceTimer)

      // Start a new debounce timer (500ms delay)
      this.debounceTimer = setTimeout(() => {
        this.$emit('update:modelValue', this.localValue)
      }, 500)
    },
    clearSearch() {
      // Immediately clear the search
      this.localValue = ''
      this.$emit('update:modelValue', '')
      if (this.debounceTimer) clearTimeout(this.debounceTimer)
    },
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
