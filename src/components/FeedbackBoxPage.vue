<template>
  <div class="feedback-box-page d-flex flex-column align-center">
    <template v-if="isFetchingLibraryDetail">
      <Loader icon="mdi-text-box-multiple" />
    </template>

    <template v-else>
      <h2 class="feedback-box-title text-center mb-3 mb-sm-5">Kotak Saran</h2>

      <div class="divider-line black">
        <ul>
          <li>
            <v-icon dense class="black--text">mdi-square</v-icon>
          </li>
          <li>
            <v-icon dense class="black--text">mdi-square</v-icon>
          </li>
        </ul>
      </div>

      <v-btn
        class="mt-5 mt-sm-8"
        color="info"
        :href="formLink"
        :disabled="!formLink"
        target="_blank"
        :small="isMobile"
        >{{ formButtonText }}</v-btn
      >
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import globalMixins from "@/mixins/global-mixins.js";
import Loader from "@/components/utilities/Loader.vue";

export default {
  name: "FeedbackBoxPage",
  mixins: [globalMixins],
  components: {
    Loader,
  },
  computed: {
    ...mapState("libraryDetails", [
      "libraryDetails",
      "isFetchingLibraryDetail",
    ]),
    formButtonText() {
      return this.formLink ? this.formLink : "Currently Unavailable";
    },
    formLink() {
      return (
        (this.libraryDetails[0] && this.libraryDetails[0].feedback_link) || ""
      );
    },
  },
};
</script>

<style lang="scss">
.feedback-box-page {
  margin-top: 140px;

  .feedback-box-title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  @include mobile {
    margin-top: 120px;

    .feedback-box-title {
      font-size: 1.25rem;
      letter-spacing: 1px;
    }
  }
}
</style>
