<template>
  <v-dialog
    content-class="edit-add-modal"
    v-model="isShow"
    max-width="50vw"
    :persistent="isLoading"
    @click:outside="closeModal"
  >
    <v-card>
      <v-card-title class="text-h6 d-flex justify-space-between">
        <span class="edit-add-title black--text"
          >{{ actionText }} <strong>{{ convertedEntityName }}</strong>
          {{ subjectText }}</span
        >
        <v-btn title="Close" icon @click="closeModal"
          ><v-icon>mdi-close</v-icon></v-btn
        ></v-card-title
      >
      <v-card-subtitle class="mt-4">
        <slot></slot>
      </v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-1"
          text
          :loading="isLoading"
          @click="closeModal"
        >
          Cancel
        </v-btn>
        <v-btn
          color="yellow darken-3"
          text
          :loading="isLoading"
          @click="submit"
        >
          {{ actionText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EditAddModal",
  props: {
    isShow: { type: Boolean, default: false },
    isUpdate: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    subjectText: { type: String, default: "Title" },
    entityName: { type: String, default: "Title" },
  },
  computed: {
    ...mapGetters(["isVisitor"]),
    actionText() {
      return this.isUpdate ? "Update" : "Create";
    },
    convertedEntityName() {
      return this.entityName ? `"${this.entityName}"` : "";
    },
  },
  methods: {
    submit() {
      if (this.isVisitor)
        return this.$toast.success("This action is only accessible by admin.");

      this.$emit("submit");
    },
    closeModal() {
      if (!this.isLoading) this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.edit-add-modal {
  .edit-add-title {
    width: calc(100% - 50px);
  }

  .modal__image-container {
    margin-right: 10px;
    margin-bottom: 5px;
    position: relative;
    width: 100px;
    height: 100px;
    border: 2px solid gold;
    padding: 3px;

    &:last-of-type {
      margin-right: 0;
    }

    .modal__image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: lightgrey;
    }

    .modal__image-delete-button {
      position: absolute;
      top: 5px;
      right: 5px;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.7);
      color: white;
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
