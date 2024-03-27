<template>

  <button type="button" class=" btn btn-outline-primary  " @click="removeItem()" @mouseover="hover = true"
    @mouseleave="hover = false" v-if="isSave">
    <div v-show="!hover">
      <div class="d-flex justify-content-center  align-items-center gap-1">
        <img src="@/assets/icons/save-full.svg" alt="save" weight="20px" height="20px">
        <span>已收藏</span>
      </div>
    </div>

    <div v-show="hover">
      <div class="d-flex justify-content-center  align-items-center gap-1">
        <img src="@/assets/icons/save-full-hover.svg" alt="save" weight="20px" height="20px">
        <span class="text-white ">移除收藏</span>
      </div>
    </div>

  </button>


  <button type="button" class=" btn " :class="{ 'btn-outline-800': !hover, 'btn-outline-primary': hover }"
    @click="saveItem()" @mouseover="hover = true" @mouseleave="hover = false" v-else>

    <div v-show="!hover">
      <div class="d-flex justify-content-center  align-items-center gap-1 ">
        <img src="@/assets/icons/save.svg" alt="save" weight="20px" height="20px">

        <span class="text-800"> 加入收藏</span>
      </div>
    </div>
    <div v-show="hover">
      <div class="d-flex justify-content-center  align-items-center gap-1 ">
        <img src="@/assets/icons/save-full-hover.svg" alt="save" weight="20px" height="20px">
        <span class="text-white"> 加入收藏</span>
      </div>
    </div>

  </button>

</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      saveKey: "favorite",
      isSave: false,
      hover: false,
      addHover: false
    }
  },
  created() {
    this.syncSaveStatus();
  },
  methods: {
    syncSaveStatus() {
      this.isSave = false;
      let saveItems = JSON.parse(localStorage.getItem(this.saveKey))
      if (saveItems) {
        for (const value of Object.values(saveItems)) {
          if (value.id === this.item.id) {
            this.isSave = true;
          }
        }
      }
    },

    saveItem() {
      let saveItems = JSON.parse(localStorage.getItem(this.saveKey))
      if (saveItems) {
        saveItems = [...saveItems, this.item]
      } else {
        saveItems = [this.item]
      }
      localStorage.setItem(this.saveKey, JSON.stringify(saveItems))
      this.syncSaveStatus()
    },
    removeItem() {
      let saveItems = [];
      let nowItems = JSON.parse(localStorage.getItem(this.saveKey))
      if (nowItems) {
        for (const value of Object.values(nowItems)) {
          if (value.id !== this.item.id) {
            saveItems = [...saveItems, value]
          }
        }
      }
      localStorage.setItem(this.saveKey, JSON.stringify(saveItems))
      this.syncSaveStatus()
    },
  },
}
</script>