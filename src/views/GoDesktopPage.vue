<template>
  <v-container class="go-desktop-page">
    <h2 class="page-title text-center">
      Please visit admin page on desktop or bigger screen.
    </h2>
    <v-btn href="/" class="mt-7 yellow accent-2">Back to Home</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "GoDesktopPage",
};
</script>

<style lang="scss">
.go-desktop-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .page-title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }
}
</style>
