<template>
  <div class="profile-organization-structure">
    <h2 class="organization-structure-title text-center">
      Struktur Organisasi
    </h2>
    <v-img
      v-if="organizationStructureImage"
      :src="organizationStructureImage"
      class="image mt-5 mt-md-10"
      contain
    ></v-img>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileOrganizationStructure",
  computed: {
    ...mapState("libraryDetails", [
      "libraryDetails",
      "isFetchingLibraryDetail",
    ]),
    organizationStructureImage() {
      if (this.libraryDetails.length)
        return this.libraryDetails[0].organization_image;
      else return "";
    },
  },
};
</script>

<style lang="scss">
.profile-organization-structure {
  margin: 60px 0 150px;

  .organization-structure-title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .image {
    height: 500px;

    @include small-tablet {
      height: auto;
      margin: 0 20px;
    }

    @include mobile {
      height: auto;
      margin: 0 20px;
    }
  }

  @include mobile {
    margin: 60px 0 120px;

    .organization-structure-title {
      font-size: 1.25rem;
      letter-spacing: 1px;
    }
  }
}
</style>
