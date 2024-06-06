<template>
  <router-link to="/" class="navbar-brand" id="logo">
    <picture>
      <!-- 當螢幕寬度小於 576px 時，顯示 -->
      <source media="(max-width: 576px)" srcset="@/assets/img/design/logo_sm.png">
      <!-- 預設情況下顯示的圖片 -->
      <img src="@/assets/img/design/logo_lg.png" alt="Logo" class="img-fluid">
    </picture>
  </router-link>
</template>
