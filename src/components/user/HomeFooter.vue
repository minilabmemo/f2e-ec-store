<template>
  <footer class="bg-orange-100 container-fluid p-5  text-gray-500   " id="footer">
    <div class="container-xl">
      <div class=" row d-flex justify-content-center  gy-3 ">
        <div class="col-6 col-sm-4   ">
          <div class="row   gy-3  ">
            <div class="col-12 fw-semibold  noto-font">About</div>
            <div class="col-12"> <router-link :to="`/about#${sectionIds.brand}`" class="nav-link">品牌介紹</router-link>
            </div>
            <div class="col-12"><router-link :to="`/about#${sectionIds.shoppingProcess}`"
                class="nav-link">購物流程</router-link></div>
            <div class="col-12"><router-link :to="`/about#${sectionIds.faqs}`" class="nav-link">常見問題</router-link></div>

          </div>

        </div>
        <div class="col-6 col-sm-4 ">
          <div class="row     gy-3 ">
            <div class="col-12 fw-semibold  noto-font ">Service</div>
            <div class="col-12"><router-link :to="`/about#${sectionIds.paymentMethods}`"
                class="nav-link">付款方式</router-link></div>
            <div class="ol-12"><router-link :to="`/about#${sectionIds.shippingService}`"
                class="nav-link">運送服務</router-link></div>
            <div class="ol-12"><router-link :to="`/about#${sectionIds.returnPolicy}`"
                class="nav-link">退換政策</router-link></div>

          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class=" row  gy-2 ">
            <div class="col-12 fw-semibold  noto-font ">Contact</div>
            <div>地址：星展區，時尚大道 88 號，韓星大樓 3 樓</div>
            <div>電話：<a href="tel:+886-2-8885678">(02) 888-5678 </a></div>
            <div>客服信箱： <a :href="`mailto:koringoffice@line.tw`">koringoffice@line.tw</a></div>
            <div class="d-flex flex-wrap ">
              <div>客服時間：</div>
              <div> 週一至週五 10:30 ~ 18:00，例假日休息</div>

            </div>
          </div>

        </div>

      </div>

    </div>
    <hr>
    <div class="row mt-3 text-center ">
      <div class="col-12  d-flex flex-column align-items-center  justify-content-center ">
        <span>非商業練習用作品</span>

        <span> Copyright © 2024 Koring All rights reserved. </span>

      </div>
    </div>

  </footer>
</template>

<script>
import sectionIds from '@/utils/config/sectionIds.js';

export default {
  data() {
    return {
      sectionIds: sectionIds
    }
  }
}
</script>@/utils/config/sectionIds.js