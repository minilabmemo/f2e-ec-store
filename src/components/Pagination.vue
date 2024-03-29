<template>
  <nav aria-label="Page navigation ">
    <ul class="pagination justify-content-center ">
      <li class="page-item">
        <a class="page-link " href="#" aria-label="Previous" @click.prevent="updatePage(pages.current_page - 1)"
          :class="{ disabled: !pages.has_pre }">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="pageNum in pages.total_pages" :key="pageNum"
        :class="{ 'active': pageNum === pages.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePage(pageNum)">
          {{ pageNum }}
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.current_page + 1)"
          :class="{ disabled: !pages.has_next }">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }" 
// 頁碼資訊:{
// total_pages:3
// current_page:3
// has_pre:true
// has_next:false}
// @change-page-num="更新頁面事件" ,param = current_page (number)
export default {
  props: ['pages'],
  methods: {
    updatePage(pageNum) {
      this.$emit('change-page-num', pageNum);
    },
  },
};
</script>