<template>
  <v-container id="fasilitas" class="home-facilities mt-10 mt-sm-15">
    <h2 class="text-center facilities__title">Fasilitas</h2>
    <div class="facilities__content">
      <div v-if="isFetchingFacility || !facilityList.length" class="mt-8">
        <Loader :is-skeleton="true" />
      </div>

      <div v-else class="facility-carousel__wrapper mt-3">
        <div class="icon-wrapper">
          <v-btn class="carousel-arrow black" fab @click="showPrev"
            ><v-icon class="white--text">mdi-chevron-left</v-icon></v-btn
          >
        </div>

        <VueSlickCarousel
          class="facility-carousel"
          ref="facilityCarousel"
          v-bind="carouselSettings"
        >
          <div
            class="facility-item__container"
            v-for="facility in facilityList"
            :key="facility.id"
          >
            <v-card class="facility-item">
              <v-img
                class="grey lighten-3"
                contain
                :src="facility.image_thumbnail"
                height="300px"
              ></v-img>

              <v-card-title class="title text-h6">
                {{ facility.title }}
              </v-card-title>

              <v-card-subtitle
                v-if="!isActiveFacility(facility.id)"
                class="description"
              >
                {{ facility.description }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="yellow darken-3"
                  text
                  @click="toggleActiveFacilityId(facility.id)"
                >
                  Explore
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn icon @click="toggleActiveFacilityId(facility.id)">
                  <v-icon>{{
                    isActiveFacility(facility.id)
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="isActiveFacility(facility.id)">
                  <v-divider></v-divider>

                  <v-card-subtitle class="pb-0 font-weight-medium">
                    Deskripsi
                  </v-card-subtitle>
                  <v-card-text class="grey--text text--darken-1">
                    ⊛ {{ facility.description }}
                  </v-card-text>

                  <v-card-subtitle class="font-weight-medium py-0">
                    Foto
                  </v-card-subtitle>
                  <div
                    class="image-list d-flex align-center flex-wrap px-4 pt-2"
                  >
                    <v-btn
                      v-for="(image_url, index) in facility.images"
                      :key="index"
                      class="image-list-item__container pl-0 pb-4"
                      text
                      :href="image_url"
                      target="_blank"
                    >
                      <v-img class="image-list-item" contain :src="image_url" />
                      <div class="overlay d-flex justify-center align-center">
                        <p class="white--text ma-0">
                          <v-icon small>mdi-eye</v-icon>
                          View
                        </p>
                      </div>
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
        </VueSlickCarousel>

        <div class="icon-wrapper">
          <v-btn class="carousel-arrow black" fab @click="showNext"
            ><v-icon class="white--text">mdi-chevron-right</v-icon></v-btn
          >
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/utilities/Loader.vue";

export default {
  name: "HomeFacilities",
  components: {
    Loader,
  },
  data() {
    return {
      activeFacilityId: -1,

      carouselSettings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        swipeToSlide: true,
        infinite: true,
        responsive: [
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("facilities", ["facilityList", "isFetchingFacility"]),
  },
  methods: {
    showNext() {
      this.toggleActiveFacilityId(-1);
      this.$refs.facilityCarousel.next();
    },
    showPrev() {
      this.toggleActiveFacilityId(-1);
      this.$refs.facilityCarousel.prev();
    },
    isActiveFacility(facilityId) {
      return this.activeFacilityId === facilityId;
    },
    toggleActiveFacilityId(facilityId) {
      if (this.activeFacilityId === facilityId)
        return (this.activeFacilityId = -1);

      this.activeFacilityId = facilityId;
    },
  },
};
</script>

<style lang="scss">
.home-facilities {
  .facilities__title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .facility-carousel__wrapper {
    display: flex;
    align-items: center;

    .facility-carousel {
      width: calc(100% - 100px);
      padding: 0 10px;

      .facility-item__container {
        display: flex !important;
        padding: 25px 0;
        justify-content: center;
      }

      .facility-item {
        width: 90%;
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.15);
        margin: 0;

        &:hover {
          transition: transform 0.3s ease-in-out;
          transform: translateY(-15px);
        }

        .title {
          padding-bottom: 0;
        }

        .description {
          margin-top: 5px;
          padding-bottom: 10px;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .image-list-item__container {
          height: auto;
          width: auto;
          padding-right: 10px;

          &::before {
            background: transparent !important;
          }

          &:hover {
            .overlay {
              opacity: 1;
            }
          }

          .image-list-item {
            min-height: 50px;
            width: 100px;
          }

          .overlay {
            position: absolute;
            background: rgba(0, 0, 0, 0.65);
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;

            p {
              text-transform: capitalize;
            }
          }
        }
      }
    }

    .icon-wrapper {
      width: 50px;
      height: 50px;

      .carousel-arrow {
        width: 100%;
        height: 100%;
      }

      .mdi-chevron-right {
        margin-right: -3px;
      }
    }
  }

  @include mobile {
    .facilities__title {
      font-size: 1.375rem;
    }

    .facility-carousel__wrapper {
      .facility-carousel {
        width: calc(100% - 80px);
        padding: 0 5px;
      }

      .icon-wrapper {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
