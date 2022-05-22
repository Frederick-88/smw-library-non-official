<template>
  <v-main class="home-banner pa-0" :style="appBackground">
    <v-container
      class="home-banner__container d-flex justify-center flex-column"
    >
      <h2 class="banner-title white--text text-center">Sma Mw Library</h2>

      <div class="divider-line white">
        <ul>
          <li>
            <v-icon dense class="white--text">mdi-square</v-icon>
          </li>
          <li>
            <v-icon dense class="white--text">mdi-square</v-icon>
          </li>
        </ul>
      </div>

      <p class="banner-subtitle white--text">
        Selamat datang di website perpustakaan SMA Maitreyawira. Temukan
        berbagai macam buku yang kamu perlukan dan sukai. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Ut gravida, quam vitae est Sed non
        eros elementum nulla sodales ullamcorper.
      </p>

      <div class="banner__cta-button d-flex flex-column align-center">
        <v-btn
          href="#fasilitas"
          class="explore-text white--text mb-1"
          :small="isMobile"
          text
          >Explore</v-btn
        >
        <v-btn
          href="#fasilitas"
          fab
          class="arrow-button black--text yellow accent-4"
          ><v-icon small class="arrow">mdi-chevron-double-down</v-icon></v-btn
        >
      </div>
    </v-container>
  </v-main>
</template>

<script>
import globalMixins from "@/mixins/global-mixins.js";

export default {
  name: "HomeBanner",
  mixins: [globalMixins],
  computed: {
    appBackground() {
      return {
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(" +
          require("@/assets/images/library-bg-desktop.jpg") +
          ")",
      };
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

.home-banner {
  height: 85vh;
  background-size: cover;
  background-position: center;

  .home-banner__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
  }

  .banner__cta-button {
    position: absolute;
    bottom: 25px;

    .arrow-button {
      height: 40px;
      width: 40px;

      .arrow {
        animation: up-down 2s infinite;

        @keyframes up-down {
          0% {
            transform: translateY(-2px);
          }
          50% {
            transform: translateY(2px);
          }
          100% {
            transform: translateY(-2px);
          }
        }
      }
    }
  }

  .banner-title {
    font-family: "Permanent Marker", "Montserrat" !important;
    font-size: 4rem;
    letter-spacing: 5px;
    margin: 0 0 30px;
  }

  .banner-subtitle {
    margin: 40px 0 0;
    max-width: 700px;
    font-weight: 400;
    line-height: 1.8;
  }

  @include tablet() {
    height: 100vh;
  }

  @include small-tablet() {
    height: 100vh;

    .banner-title {
      font-size: 3.5rem;
      letter-spacing: 4px;
    }

    .banner-subtitle {
      margin: 30px 0 0;
      font-size: 0.9375rem;
    }
  }

  @include mobile() {
    height: 100vh;

    .banner-title {
      font-size: 3.25rem;
      line-height: 1.2;
      margin: 0 0 20px;
    }

    .banner-subtitle {
      margin: 20px 0 0;
      font-size: 0.875rem;
    }
  }

  @include small-mobile() {
    height: 100vh;

    .banner-title {
      font-size: 2.75rem;
      line-height: 1.2;
      margin: 0 0 20px;
    }

    .banner-subtitle {
      margin: 20px 0 0;
      font-size: 0.8125rem;
    }
  }
}
</style>
