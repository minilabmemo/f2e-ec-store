<template>

  <button type="button" class="text-nowrap  btn btn-outline-primary  " @click="removeItem()" v-if="isSave">
    <div>
      <div class="d-flex justify-content-center  align-items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 30 30" fill="#DD8560" stroke="#DD8560"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.0864 5.51394C14.3758 4.86471 14.5205 4.5401 14.722 4.44014C14.897 4.35329 15.1025 4.35329 15.2775 4.44014C15.479 4.5401 15.6238 4.86471 15.9131 5.51394L18.2181 10.6851C18.3038 10.877 18.3465 10.973 18.4128 11.0465C18.4713 11.1115 18.5429 11.1635 18.6228 11.1991C18.7131 11.2394 18.8176 11.2504 19.0266 11.2724L24.657 11.8667C25.3639 11.9413 25.7173 11.9786 25.8746 12.1393C26.0113 12.2789 26.0748 12.4745 26.0463 12.6678C26.0135 12.8903 25.7495 13.1281 25.2215 13.604L21.0156 17.3942C20.8596 17.5349 20.7815 17.6053 20.7321 17.6909C20.6884 17.7668 20.661 17.8509 20.6519 17.9379C20.6415 18.0362 20.6633 18.139 20.7069 18.3446L21.8816 23.883C22.0291 24.5784 22.1029 24.926 21.9986 25.1253C21.908 25.2985 21.7418 25.4192 21.5491 25.4519C21.3274 25.4894 21.0195 25.3119 20.4038 24.9568L15.4994 22.128C15.3174 22.023 15.2264 21.9706 15.1296 21.95C15.044 21.9319 14.9555 21.9319 14.8699 21.95C14.7731 21.9706 14.6821 22.023 14.5001 22.128L9.59578 24.9568C8.98005 25.3119 8.67219 25.4894 8.45043 25.4519C8.25779 25.4192 8.09149 25.2985 8.00094 25.1253C7.8967 24.926 7.97044 24.5784 8.11793 23.883L9.29263 18.3446C9.33623 18.139 9.35803 18.0362 9.34768 17.9379C9.33851 17.8509 9.31118 17.7668 9.26743 17.6909C9.21799 17.6053 9.13994 17.5349 8.98385 17.3942L4.77808 13.604C4.25006 13.1281 3.98605 12.8903 3.95323 12.6678C3.92473 12.4745 3.98824 12.2789 4.12491 12.1393C4.28226 11.9786 4.6357 11.9413 5.34258 11.8667L10.9729 11.2724C11.1819 11.2504 11.2864 11.2394 11.3767 11.1991C11.4567 11.1635 11.5283 11.1115 11.5868 11.0465C11.653 10.973 11.6958 10.877 11.7814 10.6851L14.0864 5.51394Z"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <span>已收藏</span>
      </div>
    </div>

  </button>

  <button type="button" class="text-nowrap  btn btn-outline-800   " @click="saveItem()" v-else>

    <div>
      <div class="d-flex justify-content-center  align-items-center gap-1 ">

        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.0864 5.51394C14.3758 4.86471 14.5205 4.5401 14.722 4.44014C14.897 4.35329 15.1025 4.35329 15.2775 4.44014C15.479 4.5401 15.6238 4.86471 15.9131 5.51394L18.2181 10.6851C18.3038 10.877 18.3465 10.973 18.4128 11.0465C18.4713 11.1115 18.5429 11.1635 18.6228 11.1991C18.7131 11.2394 18.8176 11.2504 19.0266 11.2724L24.657 11.8667C25.3639 11.9413 25.7173 11.9786 25.8746 12.1393C26.0113 12.2789 26.0748 12.4745 26.0463 12.6678C26.0135 12.8903 25.7495 13.1281 25.2215 13.604L21.0156 17.3942C20.8596 17.5349 20.7815 17.6053 20.7321 17.6909C20.6884 17.7668 20.661 17.8509 20.6519 17.9379C20.6415 18.0362 20.6633 18.139 20.7069 18.3446L21.8816 23.883C22.0291 24.5784 22.1029 24.926 21.9986 25.1253C21.908 25.2985 21.7418 25.4192 21.5491 25.4519C21.3274 25.4894 21.0195 25.3119 20.4038 24.9568L15.4994 22.128C15.3174 22.023 15.2264 21.9706 15.1296 21.95C15.044 21.9319 14.9555 21.9319 14.8699 21.95C14.7731 21.9706 14.6821 22.023 14.5001 22.128L9.59578 24.9568C8.98005 25.3119 8.67219 25.4894 8.45043 25.4519C8.25779 25.4192 8.09149 25.2985 8.00094 25.1253C7.8967 24.926 7.97044 24.5784 8.11793 23.883L9.29263 18.3446C9.33623 18.139 9.35803 18.0362 9.34768 17.9379C9.33851 17.8509 9.31118 17.7668 9.26743 17.6909C9.21799 17.6053 9.13994 17.5349 8.98385 17.3942L4.77808 13.604C4.25006 13.1281 3.98605 12.8903 3.95323 12.6678C3.92473 12.4745 3.98824 12.2789 4.12491 12.1393C4.28226 11.9786 4.6357 11.9413 5.34258 11.8667L10.9729 11.2724C11.1819 11.2504 11.2864 11.2394 11.3767 11.1991C11.4567 11.1635 11.5283 11.1115 11.5868 11.0465C11.653 10.973 11.6958 10.877 11.7814 10.6851L14.0864 5.51394Z"
            stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <span> 加入收藏</span>
      </div>
    </div>

  </button>

</template>
<script setup lang="ts">
import LocalStorage from '@/utils/methods/localStorage'
import statusStore from '@/stores/statusStore';

import { ref, watch, onMounted } from 'vue';
import type { Product } from '@/utils/type';

const status = statusStore();

const props = defineProps<{
  item: {
    id: string;

  }
}>()

const saveKey = "favorite";
let isSave = ref(false);

const syncSaveStatus = () => {
  isSave.value = false;
  const saveItems: Product[] = LocalStorage.get(saveKey);
  if (saveItems) {
    for (const value of Object.values(saveItems)) {
      if (value.id === props.item.id) {
        isSave.value = true;
      }
    }
  }
};

const saveItem = () => {
  let saveItems = LocalStorage.get(saveKey);
  if (saveItems) {
    saveItems = [...saveItems, props.item];
  } else {
    saveItems = [props.item];
  }

  LocalStorage.set(saveKey, saveItems);
  status.pushMessage({
    title: '加入收藏',
    response: { data: { message: "", success: true }, }
  });
  syncSaveStatus();
};

const removeItem = () => {
  let saveItems: Product[] = [];
  const nowItems: Product[] = LocalStorage.get(saveKey);
  if (nowItems) {
    for (const value of Object.values(nowItems)) {
      if (value.id !== props.item.id) {
        saveItems = [...saveItems, value];
      }
    }
  }
  status.pushMessage({
    title: '移除收藏',
    response: { data: { message: "", success: true }, }
  });
  LocalStorage.set(saveKey, saveItems);
  syncSaveStatus();
};

onMounted(() => {
  syncSaveStatus();
});

watch(() => props.item, () => {
  syncSaveStatus();
}, { deep: true });

</script>

<style lang="css" scoped>
.btn-outline-primary:hover svg,
.btn-outline-800:hover svg,
.btn.active svg,
.btn:first-child:active svg,
.btn:focus-visible svg {
  fill: white;
  stroke: white;
}
</style>