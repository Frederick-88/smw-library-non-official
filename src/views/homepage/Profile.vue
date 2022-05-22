<template>
  <v-main class="pa-0">
    <profile-banner />
    <profile-vision-and-mission />
    <profile-history />
    <profile-organization-structure />
  </v-main>
</template>

<script>
import ProfileBanner from "@/components/profile/ProfileBanner.vue";
import ProfileVisionAndMission from "@/components/profile/ProfileVisionAndMission.vue";
import ProfileHistory from "@/components/profile/ProfileHistory.vue";
import ProfileOrganizationStructure from "@/components/profile/ProfileOrganizationStructure.vue";

export default {
  name: "Profile",
  components: {
    ProfileBanner,
    ProfileVisionAndMission,
    ProfileHistory,
    ProfileOrganizationStructure,
  },
};
</script>
