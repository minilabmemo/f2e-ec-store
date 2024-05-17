<template>
  <nav aria-label="Page navigation ">
    <ul class="pagination justify-content-center " :class="{ 'pagination-sm ': isExtraSmallDevice }">
      <li class="page-item">
        <a class="page-link " href="#" aria-label="Previous" @click.prevent="updatePage(pages.current_page - 1)"
          :class="{ disabled: !pages.has_pre }">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="pageNum in displayPages" :key="pageNum"
        :class="{ 'active': pageNum === pages.current_page }">
        <a v-if="pageNum === omitStr" class="page-link disabled " href="#">
          {{ pageNum }}
        </a>
        <a v-else class="page-link" href="#" @click.prevent="updatePage(pageNum)">
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
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDeviceSize } from '@/composables/useDeviceSize'
const { isExtraSmallDevice } = useDeviceSize()

const props = defineProps<{
  pages: {
    total_pages: number;
    current_page: number;
    has_pre: boolean;
    has_next: boolean;
  }
}>()
const emit = defineEmits(['change-page-num']);

function updatePage(pageNum: string | number) {
  if (typeof pageNum === 'number') {
    emit('change-page-num', pageNum);//param = current_page 
  }
}
const omitStr = ref("...");

const displayPages = computed(() => {
  const { total_pages, current_page } = props.pages;
  const maxDisplayPages = 10;
  const pagesArray = [];

  if (total_pages <= maxDisplayPages) {
    for (let i = 1; i <= total_pages; i++) {
      pagesArray.push(i);
    }
  } else {
    //only display current_page +-2
    const startPage = Math.max(1, current_page - 2);
    const endPage = Math.min(total_pages, current_page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    if (startPage > 1 && current_page - startPage > 0) {
      pagesArray.unshift(omitStr.value);
      pagesArray.unshift(1);
    }

    if (endPage !== total_pages && total_pages - current_page > 0) {
      pagesArray.push(omitStr.value);
      pagesArray.push(total_pages);
    }
  }

  return pagesArray;
});
</script>
