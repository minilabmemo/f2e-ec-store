<template>
  <div class="row   align-items-end gy-3 gx-1 gx-md-4 d-none d-md-flex">
    <div class="col-4"><img src="@/assets/img/design/news1.png" class="img-fluid" alt="news"></div>
    <div class="col-4"><img src="@/assets/img/design/news2.png" class="img-fluid" alt="news"></div>
    <div class="col-4"><img src="@/assets/img/design/news3.png" class="img-fluid" alt="news"></div>
  </div>

  <div class="  d-block d-md-none" style="max-width: 31.25rem">
    <div id="newsCarousel" class="carousel slide" data-bs-ride="carousel">

      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/design/news1.png" class="d-block w-100 " alt="news">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/design/news2.png" class="d-block w-100 " alt="news">
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/design/news3.png" class="d-block w-100 " alt="news">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Carousel from 'bootstrap/js/dist/carousel.js';

onMounted(() => {

  const newsCarouselElement = document.querySelector('#newsCarousel')
  if (newsCarouselElement) {
    new Carousel(newsCarouselElement, {
      interval: 2000,
      touch: true,
      ride: 'carousel'
    })
  } else {
    console.error('Element with ID "newsCarousel" not found.');
  }

})
</script>