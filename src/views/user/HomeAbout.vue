<template>
  <div class="container mt-5 d-flex flex-column align-items-center">
    <div class="section mb-5" :id="sectionIds.brand">
      <h3 class="mb-4 text-center text-primary ">品牌介紹</h3>
      <div class="content text-justify">
        <p>
          探索時尚新境界，我們不僅提供韓國女裝，更是引領潮流的先鋒。從日常休閒到正式場合，我們精心挑選的款式讓您無論何時何地都閃耀自信。我們的設計師團隊不斷追求創新，確保您永遠走在時尚前沿。不僅如此，我們還注重品質與舒適度的結合，讓您在時尚之中感受到無比的舒適。透過我們的電子商務平台，您可以輕鬆選購心儀的款式，踏上獨特的時尚之旅。無論您是風格獨特還是追求流行，我們都擁有完美的選擇，期待與您一同探索美麗與時尚的世界！
        </p>
      </div>
    </div>

    <img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid my-5">

    <div class="section mb-5" :id="sectionIds.shoppingProcess">
      <h3 class="mb-5 text-center text-primary">購物流程</h3>
      <div class="content text-justify">
        <p><strong>1. 瀏覽商品：</strong> 在網站上仔細瀏覽我們的商品目錄，選擇您喜歡的產品。</p>
        <p><strong>2. 點擊產品圖片：</strong> 進入詳細頁面，仔細了解更多產品信息。</p>
        <p><strong>3. 加入購物車：</strong> 將所需產品添加到購物車中，然後繼續結帳流程。</p>
        <p><strong>4. 送出訂單：</strong> 在訂單頁面填寫送貨地址、姓名、電話及電子信箱，確認後點擊“送出訂單”按鈕。</p>
        <p><strong>5. 結帳付款：</strong> 在結帳頁面進入結帳流程，即完成訂單，我們將立即為您安排出貨。</p>
      </div>
    </div>

    <img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid my-5">
    <div class="section mb-5" :id="sectionIds.faqs">
      <h3 class="mb-4 text-center text-primary ">常見問題</h3>
      <div class="content text-justify">
        <p><strong>問題 1：</strong> 如何查詢訂單狀態？</p>
        <p><strong>解答：</strong> 您可以登入您的帳號，網站右上角的選單可以點擊會員，在訂單頁面查看訂單狀態，或者聯繫我們的客服團隊查詢。</p>
        <p><strong>問題 2：</strong> 退換貨政策是什麼？</p>
        <p><strong>解答：</strong> 我們提供 30 天無憂退換貨服務，請參閱我們的退換貨政策頁面獲取更多信息，或者聯繫我們的客服團隊查詢。</p>
      </div>
    </div>
    <img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid my-5">
    <div class="section mb-5" :id="sectionIds.paymentMethods">
      <h3 class="mb-4 text-center text-primary ">付款方式</h3>
      <div class="content text-justify">
        <p><img src="/src/assets/icons/nav.svg" alt="nav" width="12px" height="12px" class="me-1 ">
          我們接受多種付款方式，包括信用卡、PayPal、支付寶等。</p>
        <p><img src="/src/assets/icons/nav.svg" alt="nav" width="12px" height="12px" class="me-1 ">
          所有付款信息均經過安全加密，保障您的個人資訊安全。</p>
      </div>
    </div>
    <img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid my-5">
    <div class="section mb-5 " :id="sectionIds.shippingService">
      <h3 class="mb-4 text-center text-primary  ">運送服務</h3>
      <div class="content text-justify">
        <p><img src="/src/assets/icons/nav.svg" alt="nav" width="12px" height="12px" class="me-1 ">
          我們提供全球送貨服務，運送到您指定的地址。</p>
        <p><img src="/src/assets/icons/nav.svg" alt="nav" width="12px" height="12px" class="me-1 ">
          部分地區可能有額外運費或運送時效，請在結帳頁面查看詳細信息。</p>
      </div>
    </div>
    <img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid my-5">
    <div class="section" :id="sectionIds.returnPolicy">
      <h3 class="mb-4 text-center text-primary ">退換政策</h3>
      <div class="content text-justify">
        <p><img src="/src/assets/icons/nav.svg" alt="nav" width="12px" height="12px" class="me-1 "> 如果您對購買的產品不滿意，您可以在 30
          天內申請退換貨。</p>
        <p><img src="/src/assets/icons/nav.svg" alt="nav" width="12px" height="12px" class="me-1 ">
          請確保商品未被使用且保留原包裝，以確保您的退換貨申請被受理。</p>
      </div>
    </div>
    <img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid my-5">
  </div>

</template>
<script>
import sectionIds from '@/utils/const/sectionIds.js';

export default {
  data() {
    return {
      sectionIds: sectionIds
    }
  }
}
</script>
<style scoped>
.section {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}

.content {
  width: 80%;
  max-width: 680px;


}
</style>
