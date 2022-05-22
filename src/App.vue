<template>
  <v-app>
    <template v-if="!isShowGoToDesktopPage">
      <Navbar />
      <v-main class="pa-0">
        <router-view />
      </v-main>
      <Footer />
    </template>

    <template v-else>
      <go-desktop-page />
    </template>
  </v-app>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";
import Footer from "@/components/base/Footer.vue";
import GoDesktopPage from "./views/GoDesktopPage.vue";

import globalMixins from "@/mixins/global-mixins.js";

// vue-slick-carousel imports
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "App",
  mixins: [globalMixins],
  components: {
    Navbar,
    Footer,
    GoDesktopPage,
  },
  computed: {
    isShowGoToDesktopPage() {
      return this.isNotDesktop && this.isOnAdminUrl;
    },
  },
};
</script>

<style lang="scss">
* {
  font-family: "Montserrat", sans-serif !important;
}

html,
body {
  scroll-behavior: smooth;
}

.v-application {
  [class*="text-"] {
    // https://stackoverflow.com/questions/45598884/change-default-font-in-vuetify
    font-family: "Montserrat", sans-serif !important;
    font-weight: 400; // update the default font-weight 500 on "text-subtitle-1" classname and etc.
  }

  font-family: "Montserrat", sans-serif !important;

  .admin-facilities,
  .admin-programs,
  .admin-book-collections,
  .admin-partners,
  .admin-library-details {
    padding-bottom: 75px; // space between footer and content
  }

  .divider-line {
    height: 1px;
    margin: 10px auto;
    max-width: 100%;
    position: relative;
    width: 300px;

    @include mobile {
      width: 225px;
    }

    ul {
      display: flex;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
    }

    li {
      transform: rotate(45deg);
      display: inline-block;

      .v-icon {
        @include mobile {
          font-size: 1rem !important;
        }
      }
    }
  }
}
</style>
