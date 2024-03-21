<template>

  <div class="container">

    <div class="row my-4">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">

        <li class="nav-item" role="presentation">
          <button class="nav-link active" :id="`${tabsInfo[0].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[0].id}`" type="button" role="tab" :aria-controls="tabsInfo[0].id"
            aria-selected="true">01
            購物車</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :id="`${tabsInfo[1].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[1].id}`" type="button" role="tab" :aria-controls="tabsInfo[1].id"
            aria-selected="false">02 填寫訂單</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :id="`${tabsInfo[2].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[2].id}`" type="button" role="tab" :aria-controls="tabsInfo[2].id"
            aria-selected="false">03 結帳</button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" :id="tabsInfo[0].id" role="tabpanel"
          :aria-labelledby="`${tabsInfo[0].id}-tab`">
          <ProductCart></ProductCart>
        </div>
        <div class="tab-pane fade" :id="tabsInfo[1].id" role="tabpanel" :aria-labelledby="`${tabsInfo[1].id}-tab`">
          <UserCart></UserCart>
        </div>
        <div class="tab-pane fade" :id="tabsInfo[2].id" role="tabpanel" :aria-labelledby="`${tabsInfo[2].id}-tab`">...
        </div>
      </div>

      <div class="d-flex justify-content-between" v-if="activeTab === 0">
        <div></div>
        <button class="btn btn-primary text-white " type="button" @click="goOrder">確認，填寫訂單</button>
        <button class="btn btn-outline-primary " type="button" @click="goOrder">繼續購物</button>
      </div>
      <div class="d-flex justify-content-between" v-if="activeTab === 1">
        <div></div>
        <button class="btn btn-primary text-white " type="button" @click="goOrder">送出訂單</button>
        <button class="btn btn-outline-primary " type="button" @click="goOrder">繼續購物</button>
      </div>

    </div>

  </div>
</template>

<script>

import Tab from 'bootstrap/js/dist/tab';
import ProductCart from '@/components/user/ProductCart.vue';
import UserCart from '@/components/user/OrderInfo.vue';
export default {
  inject: ['httpMessageState'],
  components: {ProductCart, UserCart},
  data() {
    return {
      products: [],
      activeTab: 0,
      tabsInfo: [{
        id: "01-cart",
      }, {
        id: "02-fill-order",
      }, {
        id: "03-checkout",
      }]
    }
  },
  methods: {

    setActiveTab(index) {
      this.activeTab = index;
    },
    goOrder() {
      let nextSelector = `#${this.tabsInfo[this.activeTab + 1].id}`
      var triggerEl = document.querySelector(`#pills-tab button[data-bs-target="${nextSelector}"]`)
      console.log('goOrder', triggerEl);
      console.log('nextSelector', nextSelector);
      Tab.getInstance(triggerEl).show() // Select ta
    }
  },

  mounted() {
    console.log('activeTab', this.activeTab);
    var triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab button'))
    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new Tab(triggerEl)
      triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
      })
    })
    // 監聽 show.bs.tab 事件
    document.querySelectorAll('.nav-link').forEach(tab => {
      tab.addEventListener('show.bs.tab', event => {
        console.log('event:', event.target);
        const tabId = event.target.getAttribute('aria-controls');
        let tabIndex = 0;
        this.tabsInfo.forEach((e, index) => {
          if (e.id === tabId) {
            tabIndex = index
            this.setActiveTab(tabIndex)
          }
        })

        console.log('Active Tab ID:', tabId);
        console.log('activeTab:', this.activeTab);
      });
    });
  },
};
</script>