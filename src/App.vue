<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* Import a modern font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
  --primary-color: #42b983;
  --secondary-color: #35495e;
  --accent-color: #e91e63;
  --header-bg: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  --header-text: #ffffff;
}

header {
  font-family: 'Roboto', sans-serif;
  background: var(--header-bg);
  color: var(--header-text);
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: 1.1rem;
}

.nav-link {
  color: var(--header-text);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 4px;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

nav a.router-link-exact-active {
  font-weight: 700;
  border-bottom: 2px solid var(--accent-color);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
  }

  nav {
    justify-content: flex-start;
    font-size: 1.2rem;
  }
}
</style>
