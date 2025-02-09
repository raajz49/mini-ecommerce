<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- rounded logo for the footer -->
      <div class="footer-section">
        <img src="@/assets/theraajz-logo.jpg" alt="Logo" class="footer-logo" />
        <p class="footer-description">
          This is the recent release and gonna be huge in the upcoming year in the international
          market
        </p>
      </div>

      <!-- socialmedia icons  -->
      <div class="footer-section">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="https://kpoli21/facebook.com" target="_blank" class="social-link">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="https://X.com" target="_blank" class="social-link">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://instagram.com" target="_blank" class="social-link">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- for the bottom part of footer -->

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Mini E-Commerce. All rights reserved.</p>
    </div>

    <div class="footer-made-with">
      <p>Made with <span class="love-icon">❤️</span> by <strong>Raajz</strong></p>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'

//gives the date of current year
export default {
  setup() {
    const currentYear = ref(new Date().getFullYear())

    return { currentYear }
  },
}
</script>

<style scoped>
.footer {
  background-color: #375b7f;
  color: white;
  padding: 10px 20px;
  text-align: center;
  position: relative;
  /* padding-bottom: 20px; */
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  max-width: 1200px;
  margin: auto;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  text-align: center;
}

.footer-logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid white;
}

.footer-description {
  font-size: 14px;
  color: #ddd;
  max-width: 300px;
  margin: auto;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.social-link {
  font-size: 22px;
  color: white;
  transition:
    transform 0.3s,
    color 0.3s;
}

.social-link:hover {
  color: #1e88e5;
  transform: scale(1.1);
}

.footer-bottom {
  margin-top: 10px;
  border-top: 1px solid #ddd;
  /* padding-top: 10px; */
  font-size: 14px;
  color: #ddd;
  margin-bottom: 40px;
}

.footer-made-with {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.love-icon {
  color: red;
  animation: heartbeat 1.5s infinite;
}
</style>
