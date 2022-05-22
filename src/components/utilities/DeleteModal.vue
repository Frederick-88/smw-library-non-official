<template>
  <v-dialog
    v-model="isShow"
    max-width="400"
    :persistent="isLoading"
    @click:outside="closeModal"
  >
    <v-card>
      <v-card-title class="text-h6"> Warning </v-card-title>
      <v-card-text class="text-subtitle-1"
        >Are you sure to delete this {{ deleteSubject }}?</v-card-text
      >
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
          @click="confirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteModal",
  props: {
    isShow: { type: Boolean, default: false },
    type: { type: String, default: "" },
    deleteSubject: { type: String, default: "" },
    id: { type: [Number, String], default: -1 },
  },
  computed: {
    ...mapGetters(["isVisitor"]),
    ...mapState("facilities", ["isDeletingFacility"]),
    ...mapState("programs", ["isDeletingProgram"]),
    ...mapState("bookCollections", ["isDeletingBookCollection"]),
    ...mapState("partners", ["isDeletingPartner"]),
    isLoading() {
      return (
        this.isDeletingFacility ||
        this.isDeletingProgram ||
        this.isDeletingBookCollection ||
        this.isDeletingPartner
      );
    },
  },
  methods: {
    ...mapActions("facilities", ["deleteFacility"]),
    ...mapActions("programs", ["deleteProgram"]),
    ...mapActions("bookCollections", ["deleteBookCollection"]),
    ...mapActions("partners", ["deletePartner"]),
    confirm() {
      if (this.isVisitor)
        return this.$toast.success("This action is only accessible by admin.");

      if (this.type === "facility") this.deleteFacility(this.id);
      if (this.type === "program") this.deleteProgram(this.id);
      if (this.type === "book-collection") this.deleteBookCollection(this.id);
      if (this.type === "partner") this.deletePartner(this.id);

      this.$emit("close");
    },
    closeModal() {
      if (!this.isLoading) this.$emit("close");
    },
  },
};
</script>

<style lang="scss"></style>
