<template>
  <!-- proper template to provide the view of overall products -->
  <div class="card">
    <img :src="product.image" :alt="product.title" class="card-img" loading="lazy" />
    <div class="card-content">
      <h3>{{ product.title }}</h3>
      <p>${{ product.price }}</p>
      <CButton :to="`/product/${product.id}`" variant="primary" size="md" class="btn-custom">
        View Details
      </CButton>
    </div>
  </div>
</template>

<script>
import CButton from '../components/CButton.vue'

export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true },
  },
  components: { CButton },
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s;
}
.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  flex: 1;
}
.card-content h3 {
  margin: 0 0 10px;
  font-size: 1.1rem;
}
.card-content p {
  margin: 0 0 15px;
  font-weight: bold;
  color: #333;
}

/* maintaining the alignment consistency of button */
.btn-custom {
  margin-top: auto;
  align-self: center;
}
</style>
