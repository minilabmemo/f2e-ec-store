<template>

  <div class="d-flex flex-column gap-3  home-item">

    <div class="position-relative ">
      <router-link :to="`/product/all/all/id/${item.id}`" class="nav-link">
        <img :src="item.src" alt="clothes" class="flex-image">
      </router-link>
      <div class="photo-mix-text" :class="item.color" v-if="status.isLoading">
        <h1>coming</h1>
        <h1>soon</h1>
      </div>

    </div>

    <div>
      <div class="lds-ellipsis" v-if="status.isLoading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <h4 v-else>
        <router-link :to="`/product/all/all/id/${item.id}`" class="nav-link">
          {{ item.title }}
        </router-link>
      </h4>

    </div>

  </div>

</template>

<script setup lang="ts">

import statusStore from '@/stores/statusStore';
const status = statusStore();

defineProps({
  filterErr: String,
  item: {
    type: Object,
    default: () => ({ title: "no name" })
  }
});

</script>

<style scoped>
.home-item:hover {
  opacity: .8
}

.photo-mix-text {
  mix-blend-mode: multiply;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  animation: fade-effect 5s ease 0s infinite;
}

@keyframes fade-effect {
  0% {
    opacity: 1;
  }

  50% {
    opacity: .2;
  }

  100% {
    opacity: 1;
  }
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 5rem;
  height: 5rem;
}

.lds-ellipsis div {
  position: absolute;
  top: 2.0625rem;
  width: 0.8125rem;
  height: 0.8125rem;
  border-radius: 50%;
  background: #131313;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 0.5rem;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 0.5rem;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 2rem;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 3.5rem;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(1.5rem, 0);
  }
}

.flex-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}
</style>