<template>
  <nav class="navbar">
    <router-link to="/" class="logo">Mini E-Commerce</router-link>
    <ul class="nav-links">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/cart">Cart</router-link>
      </li>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #42b983;
  color: #fff;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
}

.nav-links li a:hover {
  color: #e0e0e0;
}
</style>
