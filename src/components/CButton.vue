<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    class="c-button"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    to: { type: String, default: null },
    href: { type: String, default: null },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
  },
  computed: {
    tag() {
      if (this.to) return 'RouterLink'
      if (this.href) return 'a'
      return 'button'
    },
    buttonClasses() {
      return [`c-button--${this.variant}`, `c-button--${this.size}`]
    },
  },
}
</script>

<style scoped>
.c-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    box-shadow 0.2s ease;
  text-decoration: none;
  padding: 8px 16px;
}

/* Variants */
.c-button--primary {
  background-color: #007bff;
  color: #fff;
}
.c-button--primary:hover {
  background-color: #0056b3;
}

.c-button--secondary {
  background-color: #6c757d;
  color: #fff;
}
.c-button--secondary:hover {
  background-color: #545b62;
}

.c-button--outline {
  background: transparent;
  border: 2px solid #007bff;
  color: #007bff;
}
.c-button--outline:hover {
  background-color: #007bff;
  color: #fff;
}

/* Sizes */
.c-button--sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}
.c-button--md {
  padding: 8px 16px;
  font-size: 1rem;
}
.c-button--lg {
  padding: 10px 20px;
  font-size: 1.125rem;
}
.c-button--destructive {
  background-color: #e74c3c;
  color: #fff;
}
.c-button--destructive:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}
</style>
