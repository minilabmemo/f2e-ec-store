<template>
  <div>
    <div v-for="(item, index) in repeatedContent" :key="index"
      class="item bg-cyan-100 box-border text-center m-1 p-5 break-inside-avoid">
      <img class="w-full object-cover object-center"
        :src="`https://picsum.photos/id/${index + 10}/${item.width}/${item.height}`" :alt="`picsum-${index + 10}`"
        :width="item.width" :height="item.height" />
      <p>{{ `No. ${index + 1} card` }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repeatedContent: Array.from({length: 20}, (_, index) => {
        const width = 200;
        const height = Math.floor(Math.random() * (500 - 100 + 1)) + 100; //100~500
        return {width, height};
      })
    };
  }
};
</script>
