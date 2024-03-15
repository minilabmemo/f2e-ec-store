<template>

  <h1 class="d-flex justify-content-center m-5 ">New Arrival</h1>
  <div class="d-flex justify-content-center gap-3">

    <ArrivalItem v-for="(item, index) in items" :key="index" :isLoading="isLoading" :item="item"></ArrivalItem>

  </div>
  <div class="d-flex justify-content-center gap-3">
    <button class="btn btn-black q-btn">Explore More <img src="@/assets/icons/next_arrow.svg" alt="Next Arrow">
    </button>
  </div>
</template>


<script>
import ArrivalItem from '@/components/ArrivalItem.vue';
import coming1 from '@/assets/images/design/coming1.png';
import coming2 from '@/assets/images/design/coming2.png';
import coming3 from '@/assets/images/design/coming3.png';
export default {
  components: {ArrivalItem},
  data() {
    return {
      num: 3,
      isLoading: false,

      items: {
        1: {
          title: "韓國 ONLINE 收腰洋裝 - 氣質浪漫素面渡假連身裙", src: coming1, color: "orange",
        },
        2: {
          title: "韓國大衣 - 素面西裝面料 V 領無釦長版連肩長袖 ", src: coming2, color: "secondary",
        },
        3: {title: "針織罩衫 - 簡約素面開襟無釦長袖好氣色長版外套", src: coming3, color: "gray", },
      }
    }
  },

}
</script>