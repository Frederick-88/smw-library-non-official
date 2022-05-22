<template>
  <div class="home-open-hours mt-10 mt-sm-15" :style="backgroundImageStyle">
    <v-container class="py-0">
      <h2 class="text-center open-hours__title white--text">
        Jam Buka Layanan
      </h2>
      <div class="schedule-list__container d-flex justify-center mt-7 mt-sm-10">
        <div class="schedule-list">
          <div
            v-for="(schedule, index) in scheduleList"
            :key="schedule.day"
            :class="scheduleItemClass(index)"
          >
            <v-icon class="mr-2 yellow--text text--darken-3" :dense="isMobile"
              >mdi-clock</v-icon
            >
            <p class="schedule-day ma-0 white--text">{{ schedule.day }}</p>
            <p class="mx-5 ma-0 white--text">:</p>
            <p class="schedule-value ma-0 white--text">{{ schedule.value }}</p>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import globalMixins from "@/mixins/global-mixins.js";

export default {
  name: "HomeOpenHours",
  mixins: [globalMixins],
  data() {
    return {
      scheduleList: [
        {
          day: "Senin - Jumat",
          value: "12:00 - 22:00",
        },
        {
          day: "Sabtu",
          value: "12:00 - 18:00",
        },
        {
          day: "Minggu & Hari Libur",
          value: "Tutup",
        },
      ],
    };
  },
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url(" +
          require("@/assets/images/library-open-hours-bg.jpg") +
          ")",
      };
    },
  },
  methods: {
    scheduleItemClass(index) {
      const cssClass = ["schedule-item", "d-flex", "align-center"];

      if (index !== 2) cssClass.push("mb-5");

      return cssClass.join(" ");
    },
  },
};
</script>

<style lang="scss">
.home-open-hours {
  padding: 100px 0;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .open-hours__title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .schedule-list {
    width: 350px;
  }

  .schedule-day {
    width: 165px;
  }

  @include mobile {
    .open-hours__title {
      font-size: 1.375rem;
    }

    .schedule-list {
      p {
        font-size: 0.875rem;
        font-weight: 500;
      }
    }

    .schedule-day {
      width: 150px;
    }
  }

  @include small-mobile {
    .open-hours__title {
      font-size: 1.25rem;
    }

    .schedule-list {
      p {
        font-size: 0.8125rem;
        font-weight: 500;
      }
    }

    .schedule-day {
      width: 135px;
    }
  }
}
</style>
