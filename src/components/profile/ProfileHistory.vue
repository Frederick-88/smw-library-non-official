<template>
  <div class="profile-history mt-15" :style="backgroundImageStyle">
    <v-container class="py-0">
      <h2 class="history-title white--text text-center">
        Sejarah Perpustakaan
      </h2>

      <p
        class="history-description white--text mt-8 mb-0 text-subtitle-2 text-sm-subtitle-1"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mauris commodo quis
        imperdiet massa tincidunt nunc. Ut morbi tincidunt augue interdum velit
        euismod in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris
        commodo quis imperdiet massa tincidunt nunc. Ut morbi tincidunt augue
        interdum velit euismod in.
      </p>

      <p
        class="history-description white--text mt-4 mb-0 text-subtitle-2 text-sm-subtitle-1"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mauris commodo quis
        imperdiet massa tincidunt nunc. Ut morbi tincidunt augue interdum velit
        euismod in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris
        commodo quis imperdiet massa tincidunt nunc. Ut morbi tincidunt augue
        interdum velit euismod in.
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ProfileHistory",
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.65) 100%), url(" +
          require("@/assets/images/library-history-bg.webp") +
          ")",
      };
    },
  },
};
</script>

<style lang="scss">
.profile-history {
  padding: 100px 0;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .history-title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .history-description {
    line-height: 1.6;
    text-align: justify;
  }

  @include mobile {
    .history-title {
      font-size: 1.25rem;
      letter-spacing: 1px;
    }
  }
}
</style>
