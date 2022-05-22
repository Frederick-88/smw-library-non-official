<template>
  <v-container class="home-book-collections">
    <h2 class="text-center book-collections__title">Koleksi Buku</h2>
    <div class="book-collections__content">
      <div
        v-if="isFetchingBookCollection || !bookCollectionList.length"
        class="mt-8"
      >
        <Loader :is-skeleton="true" />
      </div>

      <div v-else class="book-collections-carousel__wrapper mt-3">
        <div class="icon-wrapper">
          <v-btn class="carousel-arrow black" fab @click="showPrev"
            ><v-icon class="white--text">mdi-chevron-left</v-icon></v-btn
          >
        </div>

        <VueSlickCarousel
          class="book-collections-carousel"
          ref="bookCollectionCarousel"
          v-bind="carouselSettings"
        >
          <v-btn
            class="book-collections-item__container"
            v-for="bookCollection in bookCollectionList"
            :key="bookCollection.id"
            href="https://elibrary.uvers.ac.id"
            target="_blank"
          >
            <v-card class="book-collections-item">
              <v-img
                :src="bookCollection.image_thumbnail"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
                width="100%"
              >
                <v-card-title v-text="bookCollection.title"></v-card-title>
              </v-img>
            </v-card>
          </v-btn>
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
  name: "HomeBookCollections",
  components: {
    Loader,
  },
  data() {
    return {
      carouselSettings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        swipeToSlide: true,
        infinite: true,
        responsive: [
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("bookCollections", [
      "bookCollectionList",
      "isFetchingBookCollection",
    ]),
  },
  methods: {
    showNext() {
      this.$refs.bookCollectionCarousel.next();
    },
    showPrev() {
      this.$refs.bookCollectionCarousel.prev();
    },
  },
};
</script>

<style lang="scss">
.home-book-collections {
  margin-top: 80px;

  .book-collections__title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .book-collections-carousel__wrapper {
    display: flex;
    align-items: center;

    .book-collections-carousel {
      width: calc(100% - 100px);
      padding: 0 10px;

      .book-collections-item__container {
        display: flex !important;
        padding: 25px 0;
        justify-content: center;
        height: auto;
        width: auto;
        background: transparent !important;
        box-shadow: none;

        &::before {
          background: transparent !important;
        }

        .v-btn__content {
          width: 100%;
        }

        .v-ripple__container {
          display: none !important;
        }
      }

      .book-collections-item {
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
    margin-top: 60px;

    .book-collections__title {
      font-size: 1.375rem;
    }

    .book-collections-carousel__wrapper {
      .book-collections-carousel {
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
