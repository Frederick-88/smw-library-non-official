<template>
  <v-container class="home-programs mt-10 mt-sm-15">
    <h2 class="text-center programs__title">Program</h2>
    <div class="programs__content">
      <div v-if="isFetchingProgram || !programList.length" class="mt-8">
        <Loader :is-skeleton="true" />
      </div>

      <div v-else class="program-carousel__wrapper mt-5">
        <div class="icon-wrapper">
          <v-btn class="carousel-arrow black" fab @click="showPrev"
            ><v-icon class="white--text">mdi-chevron-left</v-icon></v-btn
          >
        </div>

        <VueSlickCarousel
          class="program-carousel"
          ref="programCarousel"
          v-bind="carouselSettings"
        >
          <div
            class="program-item__container"
            v-for="program in programList"
            :key="program.id"
          >
            <v-card class="program-item">
              <span class="program__date-tag rounded black white--text">{{
                program.date
              }}</span>

              <v-img
                class="grey lighten-3"
                contain
                :src="program.image_thumbnail"
                height="300px"
              ></v-img>

              <v-card-title class="title text-h6">
                {{ program.title }}
              </v-card-title>

              <v-card-subtitle
                v-if="!isActiveProgram(program.id)"
                class="description"
              >
                {{ program.description }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="yellow darken-3"
                  text
                  @click="toggleActiveProgramId(program.id)"
                >
                  Explore
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn icon @click="toggleActiveProgramId(program.id)">
                  <v-icon>{{
                    isActiveProgram(program.id)
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="isActiveProgram(program.id)">
                  <v-divider></v-divider>

                  <v-card-subtitle class="pb-0 font-weight-medium">
                    Deskripsi
                  </v-card-subtitle>
                  <v-card-text class="grey--text text--darken-1">
                    ⊛ {{ program.description }}
                  </v-card-text>

                  <v-card-subtitle class="py-0 font-weight-medium">
                    Tanggal
                  </v-card-subtitle>
                  <v-card-text class="grey--text text--darken-1">
                    ⊛ {{ program.date }}
                  </v-card-text>

                  <v-card-subtitle class="font-weight-medium py-0">
                    Foto
                  </v-card-subtitle>
                  <div
                    class="image-list d-flex align-center flex-wrap px-4 pt-2"
                  >
                    <v-btn
                      v-for="(image_url, index) in program.images"
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
  name: "HomePrograms",
  components: {
    Loader,
  },
  data() {
    return {
      activeProgramId: -1,

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
    ...mapState("programs", ["programList", "isFetchingProgram"]),
  },
  methods: {
    showNext() {
      this.toggleActiveProgramId(-1);
      this.$refs.programCarousel.next();
    },
    showPrev() {
      this.toggleActiveProgramId(-1);
      this.$refs.programCarousel.prev();
    },
    isActiveProgram(programId) {
      return this.activeProgramId === programId;
    },
    toggleActiveProgramId(programId) {
      if (this.activeProgramId === programId)
        return (this.activeProgramId = -1);

      this.activeProgramId = programId;
    },
  },
};
</script>

<style lang="scss">
.home-programs {
  .programs__title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .program-carousel__wrapper {
    display: flex;
    align-items: center;

    .program-carousel {
      width: calc(100% - 100px);
      padding: 0 10px;

      .program-item__container {
        display: flex !important;
        padding: 25px 0;
        justify-content: center;
      }

      .program-item {
        width: 90%;
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.15);
        margin: 0;
        position: relative;

        &:hover {
          transition: transform 0.3s ease-in-out;
          transform: translateY(-15px);
        }

        .program__date-tag {
          position: absolute;
          width: 100px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          top: -10px;
          right: 0;
          font-size: 0.875rem;
          font-weight: 600;
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
    .programs__title {
      font-size: 1.375rem;
    }

    .program-carousel__wrapper {
      .program-carousel {
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
