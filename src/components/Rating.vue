<template>
  <div class="rating">
    <div class="stars">
      <template v-for="n in fullStars" :key="'full-' + n">
        <span class="star full">★</span>
      </template>
      <template v-if="hasHalfStar">
        <span class="star half">★</span>
      </template>
      <template v-for="n in emptyStars" :key="'empty-' + n">
        <span class="star empty">☆</span>
      </template>
    </div>
    <div class="rating-count" v-if="count">({{ count }} reviews)</div>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    rating: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    fullStars() {
      return Math.floor(this.rating)
    },
    hasHalfStar() {
      return this.rating - Math.floor(this.rating) >= 0.5
    },
    emptyStars() {
      const total = 5
      const full = Math.floor(this.rating)
      const half = this.hasHalfStar ? 1 : 0
      return total - full - half
    },
  },
}
</script>

<style scoped>
.rating {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}
.stars .star {
  color: #f5c518; /* Gold color for stars */
}
.stars .star.empty {
  color: #ccc;
}
.rating-count {
  font-size: 0.9rem;
  color: #666;
  margin-left: 8px;
}
</style>
