<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="container">
    <div class="row mt-4">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
            type="button" role="tab" aria-controls="pills-home" aria-selected="true">01 購物車</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
            type="button" role="tab" aria-controls="pills-profile" aria-selected="false">02 填寫訂單</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact"
            type="button" role="tab" aria-controls="pills-contact" aria-selected="false">03 結帳</button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <ProductCart></ProductCart>
        </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
      </div>

    </div>

  </div>
</template>

<script>

import Tab from 'bootstrap/js/dist/tab';
import ProductCart from '@/components/Front/ProductCart.vue';
export default {
  inject: ['httpMessageState'],
  components: {ProductCart},
  mounted() {
    var triggerTabList = [].slice.call(document.querySelectorAll('#myTab button'))
    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new Tab(triggerEl)

      triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        tabTrigger.show()
      })
    })
  },
};
</script>