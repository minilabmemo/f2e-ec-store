<template>
  <div class="  ">
    <div id="bannersCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <router-link :to="`/product/new/all`" class="nav-link">
            <img src="@/assets/img/design/banner1.png" class="d-block w-100" alt="clothes shop banner">
          </router-link>
        </div>
        <div class="carousel-item">
          <router-link :to="`/product/new/all`" class="nav-link">
            <img src="@/assets/img/design/banner2.png" class="d-block w-100" alt="member banner">
          </router-link>
        </div>
        <div class="carousel-item">
          <router-link :to="`/product/new/all`" class="nav-link">
            <img src="@/assets/img/design/banner3.png" class="d-block w-100" alt="dress banner">
          </router-link>
        </div>
      </div>
      <button type="button" class="carousel-control-prev" data-bs-target="#bannersCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button type="button" class="carousel-control-next" data-bs-target="#bannersCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Carousel from 'bootstrap/js/dist/carousel.js';

onMounted(() => {
  const bannersCarouselElement = document.querySelector('#bannersCarousel');
  if (bannersCarouselElement) {
    new Carousel(bannersCarouselElement, {
      interval: 2000,
      touch: true,
      ride: 'carousel'
    });
  } else {
    console.error('Element with ID "bannersCarousel" not found.');
  }
});
</script>
