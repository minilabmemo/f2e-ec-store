<template>
  <router-link to="/" class="navbar-brand" id="logo">
    <picture>
      <!-- 當螢幕寬度小於 576px 時，顯示 -->
      <source media="(max-width: 576px)" srcset="@/assets/images/design/logo_home_sm.png">
      <!-- 預設情況下顯示的圖片 -->
      <img src="@/assets/icons/logo_home.svg" alt="Logo" class="img-fluid ">
    </picture>

  </router-link>
</template>