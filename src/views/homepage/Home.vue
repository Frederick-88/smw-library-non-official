<template>
  <v-main class="pa-0">
    <home-banner />
    <home-facilities />
    <home-open-hours />
    <home-programs />
    <home-partners />
    <home-book-collections />
    <home-maps />
  </v-main>
</template>

<script>
import HomeBanner from "@/components/home/HomeBanner.vue";
import HomeFacilities from "@/components/home/HomeFacilities.vue";
import HomeOpenHours from "@/components/home/HomeOpenHours.vue";
import HomePrograms from "@/components/home/HomePrograms.vue";
import HomePartners from "@/components/home/HomePartners.vue";
import HomeBookCollections from "@/components/home/HomeBookCollections.vue";
import HomeMaps from "@/components/home/HomeMaps.vue";

export default {
  name: "Home",
  components: {
    HomeBanner,
    HomeFacilities,
    HomeOpenHours,
    HomePrograms,
    HomePartners,
    HomeBookCollections,
    HomeMaps,
  },
};
</script>
