<template>
  <!-- TODO 空間高度放大 -->
  <div class="container-xl ">

    <div class="row my-4 ">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">

        <li class="nav-item" role="presentation">
          <button class="nav-link active" :id="`${tabsInfo[0].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[0].id}`" type="button" role="tab" :aria-controls="tabsInfo[0].id"
            aria-selected="true">01
            購物車</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link " :disabled="stepRecord < 1" :id="`${tabsInfo[1].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[1].id}`" type="button" role="tab" :aria-controls="tabsInfo[1].id"
            aria-selected="false">02 填寫訂單</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :disabled="stepRecord < 2" :id="`${tabsInfo[2].id}-tab`" data-bs-toggle="pill"
            :data-bs-target="`#${tabsInfo[2].id}`" type="button" role="tab" :aria-controls="tabsInfo[2].id"
            aria-selected="false">03 結帳</button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" :id="tabsInfo[0].id" role="tabpanel"
          :aria-labelledby="`${tabsInfo[0].id}-tab`">
          <ProductCart @go-next="goNextTab" :checkout="checkout"></ProductCart>
        </div>
        <div class="tab-pane fade" :id="tabsInfo[1].id" role="tabpanel" :aria-labelledby="`${tabsInfo[1].id}-tab`">
          <OrderInfo @go-next="goNextTab" @order-create="updateOrderID"></OrderInfo>
        </div>
        <div class="tab-pane fade" :id="tabsInfo[2].id" role="tabpanel" :aria-labelledby="`${tabsInfo[2].id}-tab`">
          <OrderByID :orderId="orderId"></OrderByID>
        </div>
      </div>




    </div>

  </div>
</template>

<script>

import Tab from 'bootstrap/js/dist/tab';
import ProductCart from '@/components/user/ProductCart.vue';
import OrderInfo from '@/components/user/SendOrder.vue';
import OrderByID from '@/components/user/OrderByID.vue';

export default {
  inject: ['httpMessageState'],
  components: {ProductCart, OrderInfo, OrderByID},
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
      var triggerEl = document.querySelector(`#pills-tab button[data-bs-target="${nextSelector}"]`)
      Tab.getInstance(triggerEl).show()


    },
    updateOrderID(orderID) {
      this.checkout = true;
      this.orderId = orderID
    }
  },

  mounted() {

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