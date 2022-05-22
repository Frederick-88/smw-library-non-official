<template>
  <v-container class="home-maps">
    <h2 class="text-center maps__title">Lokasi</h2>
    <div class="d-flex justify-center mt-5 mt-sm-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127646.67601938976!2d103.99190889198744!3d1.1894357913311087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98912790d1045%3A0x1c772190c5fef74e!2sMaha%20Vihara%20Duta%20Maitreya%20Monastery!5e0!3m2!1sen!2sid!4v1652719410928!5m2!1sen!2sid"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "HomeMaps",
};
</script>

<style lang="scss">
.home-maps {
  margin-top: 80px;
  margin-bottom: 150px;

  .maps__title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  @include mobile {
    margin-top: 60px;
    margin-bottom: 120px;

    .maps__title {
      font-size: 1.375rem;
    }
  }
}
</style>
