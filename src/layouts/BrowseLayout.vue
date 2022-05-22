<template>
  <div class="browse-layout">
    <div
      class="browse-layout__header d-flex justify-space-between align-center"
    >
      <h3 class="d-flex align-center header-title">
        <v-icon color="black" class="header-icon mr-2">{{ headerIcon }}</v-icon>
        {{ headerTitle }}
      </h3>
      <v-btn
        v-if="isShowAddButton"
        class="header__add-button"
        outlined
        title="Add"
        :disabled="isLoading"
        @click="$emit('onclick-create-button')"
        >Add {{ subjectText }}
        <v-icon dense class="ml-1">mdi-plus</v-icon></v-btn
      >
    </div>

    <template v-if="isLoading">
      <Loader :icon="headerIcon" />
    </template>
    <template v-else>
      <div class="browse-layout__content elevation-10 mt-10 rounded-xl">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import Loader from "@/components/utilities/Loader.vue";

export default {
  name: "BrowseLayout",
  components: {
    Loader,
  },
  props: {
    headerTitle: { type: String, default: "Title" },
    headerIcon: { type: String, default: "mdi-eye" },
    subjectText: { type: String, default: "Title" },
    isShowAddButton: { type: Boolean, default: true },
    isLoading: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
.browse-layout {
  margin-top: 140px;

  .browse-layout__content,
  .browse-layout__header {
    margin-right: 50px;
    margin-left: 50px;
  }

  .browse-layout__header {
    .header-title {
      font-weight: 600;
    }

    .header-icon {
      font-size: 1.75rem;
    }

    .header__add-button {
      font-size: 0.8125rem;
    }
  }

  .browse-layout__content {
    overflow: hidden;

    th {
      font-size: 0.75rem !important;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    th,
    td {
      text-align: center !important;
    }

    .image-thumbnail {
      width: 125px;
      min-height: 100px;
      object-fit: contain;

      &.image--large {
        width: auto;
        height: 350px;
      }
    }

    .ellipsis {
      width: 400px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
    }

    .button-list {
      min-width: 250px;
    }
  }
}
</style>
