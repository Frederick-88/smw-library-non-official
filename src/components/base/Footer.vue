<template>
  <v-footer
    class="footer black d-flex py-3 px-2 px-sm-10 justify-center justify-sm-space-between"
  >
    <h5 class="footer-text white--text">
      © 2022 All Rights Reserved, SMA Maitreyawira Library
    </h5>
    <img
      class="footer-logo d-none d-sm-block"
      :src="require('@/assets/images/smw-small-logo.png')"
    />
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.footer {
  height: 80px;

  .footer-text {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: -4px;

    @include mobile {
      font-size: 0.8125rem;
      text-align: center;
    }
  }

  .footer-logo {
    width: 45px;
  }
}
</style>
