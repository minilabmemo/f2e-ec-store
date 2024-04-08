<template>

  <div class="d-flex flex-column gap-3  ">

    <div class="position-relative ">

      <img :src="item.src" alt="image" class="flex-image">
      <div class="photo-mix-text" :class="item.color" v-if="isLoading">
        <h1>coming</h1>
        <h1>soon</h1>
      </div>

    </div>

    <div>
      <div class="lds-ellipsis" v-if="isLoading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <h4 v-else>
        {{ item.title }}
      </h4>

    </div>


  </div>
</template>


<script setup lang="ts">


import { defineProps } from 'vue';
import statusStore from '@/stores/statusStore';
const { isLoading } = statusStore();
console.log('isLoading', isLoading);

defineProps({
  filterErr: String,
  item: { title: "no name" },
});


</script>



<style scoped>
.primary {
  color: var(--bs-primary);
}

.secondary {
  color: var(--bs-secondary);
}

.orange {
  color: var(--bs-orange-200);
}

.gray {
  color: var(--bs-gray-300);
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
  width: 80px;
  height: 80px;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #131313;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
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
    transform: translate(24px, 0);
  }
}

.flex-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}
</style>