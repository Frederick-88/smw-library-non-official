<template>
  <div class="home-partners">
    <h2 class="text-center partners__title">Partner</h2>
    <div class="partners__content">
      <div v-if="isFetchingPartner || !partnerList.length">
        <Loader icon="mdi-account-group" />
      </div>

      <div v-else class="partner-carousel__wrapper mt-0 mt-sm-5">
        <VueSlickCarousel class="partner-carousel" v-bind="carouselSettings">
          <div
            class="partner-item__container"
            v-for="partner in partnerList"
            :key="partner.id"
          >
            <div class="image__container">
              <v-img class="image" contain :src="partner.logo_url"></v-img>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/utilities/Loader.vue";

export default {
  name: "HomePartners",
  components: {
    Loader,
  },
  data() {
    return {
      carouselSettings: {
        slidesToShow: 6,
        arrows: false,
        dots: false,
        swipeToSlide: true,
        infinite: true,
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        swipe: false,
        responsive: [
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("partners", ["partnerList", "isFetchingPartner"]),
  },
};
</script>

<style lang="scss">
.home-partners {
  margin-top: 80px;

  .partners__title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .partner-carousel__wrapper {
    display: flex;
    align-items: center;

    .partner-carousel {
      width: 100%;

      .partner-item__container {
        display: flex !important;
        justify-content: center;
        align-items: center;
        height: 200px;
      }
    }

    .image {
      width: 150px;
      height: 200px;

      @include small-tablet {
        width: 125px;
        height: 150px;
      }

      @include mobile {
        width: 100px;
        height: 125px;
      }
    }
  }

  @include mobile {
    margin-top: 60px;

    .partners__title {
      font-size: 1.375rem;
    }
  }
}
</style>
