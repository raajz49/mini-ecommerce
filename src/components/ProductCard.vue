<template>
  <div class="card">
    <img :src="product.image" :alt="product.title" class="card-img" />
    <h3>{{ product.title }}</h3>
    <p>\${{ product.price }}</p>
    <router-link :to="`/product/${product.id}`" class="btn">View Details</router-link>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true },
  },
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}
.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.card-img {
  max-width: 100%;
  height: auto;
}
.btn {
  display: inline-block;
  padding: 8px 16px;
  background: #42b983;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 10px;
}
</style>
