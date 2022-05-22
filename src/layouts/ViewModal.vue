<template>
  <v-dialog
    content-class="view-modal"
    v-model="isShow"
    max-width="50vw"
    @click:outside="$emit('close')"
  >
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between">
        <span class="black--text">View {{ subjectText }}</span>
        <v-btn title="Close" icon @click="$emit('close')"
          ><v-icon>mdi-close</v-icon></v-btn
        ></v-card-title
      >
      <v-card-subtitle class="mt-4">
        <slot></slot>
      </v-card-subtitle>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ViewModal",
  props: {
    isShow: { type: Boolean, default: false },
    subjectText: { type: String, default: "Title" },
  },
};
</script>

<style lang="scss">
.view-modal {
  .view-modal__image {
    width: 100px;
    padding: 3px;
    border: 2px solid gold;
    margin-right: 10px;
    margin-bottom: 5px;
    object-fit: contain;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .content-list {
    margin-bottom: 25px;

    p {
      margin: 0;
    }
  }
}
</style>
