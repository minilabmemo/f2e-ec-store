<template>

  <div class="container font-sm ">

    <div class="row my-4 ">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">

        <li class="nav-item" role="presentation">
          <button class="nav-link font-sm active" :id="`${tabsInfo[0].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[0].id}`" type="button" role="tab" :aria-controls="tabsInfo[0].id"
            aria-selected="true">01
            購物車</button>
        </li>
        <li class="nav-item " role="presentation">
          <button class="nav-link " :disabled="stepRecord < 1" :id="`${tabsInfo[1].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[1].id}`" type="button" role="tab" :aria-controls="tabsInfo[1].id"
            aria-selected="false">02 填寫訂單</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link " :disabled="stepRecord < 2" :id="`${tabsInfo[2].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[2].id}`" type="button" role="tab" :aria-controls="tabsInfo[2].id"
            aria-selected="false">03 結帳</button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" :id="tabsInfo[0].id" role="tabpanel"
          :aria-labelledby="`${tabsInfo[0].id}-tab`">
          <CartFlowItems @go-next="goNextTab" :checkout="checkout" />
        </div>
        <div class="tab-pane fade" :id="tabsInfo[1].id" role="tabpanel" :aria-labelledby="`${tabsInfo[1].id}-tab`">
          <CartFlowOrderLoc @go-next="goNextTab" @go-prev="goPrevTab" @order-create="updateOrderID" />
        </div>
        <div class="tab-pane fade" :id="tabsInfo[2].id" role="tabpanel" :aria-labelledby="`${tabsInfo[2].id}-tab`">
          <CartFlowOrderSuccess :orderId="orderId" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import Tab from 'bootstrap/js/dist/tab';
import CartFlowItems from '@/components/user/CartFlowItems.vue';
import CartFlowOrderLoc from '@/components/user/CartFlowOrderLoc.vue';
import CartFlowOrderSuccess from '@/components/user/CartFlowOrderSuccess.vue';

export default {

  components: {CartFlowItems, CartFlowOrderLoc, CartFlowOrderSuccess},
  data() {
    return {
      orderId: "",
      stepRecord: 0,//紀錄
      checkout: false,
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
    goNextTab() {
      this.stepRecord = this.activeTab + 1;
      let nextSelector = `#${this.tabsInfo[this.activeTab + 1].id}`
      let triggerEl = document.querySelector(`#pills-tab button[data-bs-target="${nextSelector}"]`)
      Tab.getInstance(triggerEl).show()
    },

    goPrevTab() {
      this.stepRecord = this.activeTab - 1;
      let prevSelector = `#${this.tabsInfo[this.activeTab - 1].id}`
      let triggerEl = document.querySelector(`#pills-tab button[data-bs-target="${prevSelector}"]`)
      Tab.getInstance(triggerEl).show()
    },

    updateOrderID(orderID) {
      this.checkout = true;
      this.orderId = orderID
    }
  },

  mounted() {

    let triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab button'))
    triggerTabList.forEach(function (triggerEl) {
      let tabTrigger = new Tab(triggerEl)
      triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
      })
    })
    // 監聽 show.bs.tab 事件
    document.querySelectorAll('.nav-link').forEach(tab => {
      tab.addEventListener('show.bs.tab', event => {
        const tabId = event.target.getAttribute('aria-controls');
        let tabIndex = 0;
        this.tabsInfo.forEach((e, index) => {
          if (e.id === tabId) {
            tabIndex = index
            this.setActiveTab(tabIndex)
          }
        })
      });
    });
  },
};
</script>