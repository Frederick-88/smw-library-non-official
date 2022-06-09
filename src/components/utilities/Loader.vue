<template>
  <div :class="loaderClass">
    <template v-if="!isSkeleton">
      <div class="smw-loader">
        <div class="loader" />
        <v-icon dense class="loader__middle-icon ml-1">{{ icon }}</v-icon>
      </div>
      <p class="loader__text">Loading ...</p>
    </template>
    <template v-else>
      <v-row class="d-flex justify-center">
        <v-col cols="10" md="6" xl="4" class="pa-0">
          <v-skeleton-loader
            :elevation="5"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="10" md="6" xl="4" class="pa-0 pl-6 d-none d-md-block">
          <v-skeleton-loader
            :elevation="5"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="10" md="6" xl="4" class="pa-0 pl-6 d-none d-xl-block">
          <v-skeleton-loader
            :elevation="5"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    icon: { type: String, default: "mdi-account" },
    isLeft: { type: Boolean, default: false },
    isSkeleton: { type: Boolean, default: false },
  },
  computed: {
    loaderClass() {
      const cssClass = ["smw-loader__container"];

      if (this.isLeft) cssClass.push("container--left");
      if (this.isSkeleton) cssClass.push("container--skeleton");

      return cssClass.join(" ");
    },
  },
};
</script>

<style lang="scss">
.smw-loader__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  &.container--left,
  &.container--skeleton {
    margin-top: 0;
  }

  &.container--left {
    width: 150px;
  }

  .row {
    width: 100%;
    margin: 0;

    .v-skeleton-loader {
      box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.25) !important;
    }
  }

  // -----
  // -----

  .smw-loader {
    position: relative;
  }

  .loader__middle-icon {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    color: #f9a825;
    font-size: 2.5rem;

    &.icon-agent {
      font-size: 2.75rem;
    }
  }

  .loader {
    border: 5px solid black;
    border-radius: 50%;
    border-top: 5px solid #f9a825;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  .loader__text {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 30px 0 0;
    color: black;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
