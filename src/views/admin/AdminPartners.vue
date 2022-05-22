<template>
  <div class="admin-partners">
    <BrowseLayout
      header-title="Partners"
      header-icon="mdi-account-group"
      subject-text="Partner"
      :is-loading="isFetchingPartner"
      @onclick-create-button="setShowEditAddModal(true)"
    >
      <v-simple-table fixed-header :height="adminTableHeight">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Partner Logo</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="partner in partnerList" :key="partner.id">
              <td>{{ partner.id }}</td>
              <td>
                <img class="image-thumbnail" :src="partner.logo_url" />
              </td>
              <td class="button-list">
                <v-btn
                  title="Delete"
                  outlined
                  @click="setShowDeleteModal(true, partner.id)"
                  ><v-icon small>mdi-trash-can</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </BrowseLayout>

    <EditAddModal
      :is-show="isShowEditAddModal"
      :is-update="false"
      entity-name=""
      subject-text="Partner"
      :is-loading="isUploadingSingleImage"
      @close="setShowEditAddModal(false)"
      @submit="submitEditAddForm"
    >
      <div class="edit-add-modal__content">
        <v-file-input
          ref="singleFileupload"
          label="Partner Image Thumbnail"
          accept="image/*"
          show-size
          truncate-length="50"
          @change="setEditAddImage($event)"
        ></v-file-input>
        <div v-if="editAddForm.logo_url" class="modal__image-container">
          <img class="modal__image" :src="editAddForm.logo_url" />
          <v-btn
            class="modal__image-delete-button"
            title="Delete"
            icon
            @click="removeEditAddImage"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </div>
      </div>
    </EditAddModal>

    <DeleteModal
      :is-show="isShowDeleteModal"
      type="partner"
      delete-subject="partner"
      :id="activeDeleteId"
      @close="setShowDeleteModal(false)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { storageRef } from "@/firebase/db";

import BrowseLayout from "@/layouts/BrowseLayout.vue";
import EditAddModal from "@/layouts/EditAddModal.vue";
import DeleteModal from "@/components/utilities/DeleteModal.vue";

import adminAuthMixins from "@/mixins/admin-auth-mixins.js";
import globalMixins from "@/mixins/global-mixins.js";

export default {
  name: "AdminPartners",
  mixins: [adminAuthMixins, globalMixins],
  components: {
    BrowseLayout,
    EditAddModal,
    DeleteModal,
  },
  data() {
    return {
      isShowEditAddModal: false,
      editAddForm: {},

      isShowDeleteModal: false,
      activeDeleteId: -1,

      isUploadingSingleImage: false,
    };
  },
  computed: {
    ...mapState("partners", ["partnerList", "isFetchingPartner"]),
  },
  mounted() {},
  methods: {
    ...mapActions("partners", ["createPartner"]),
    setShowEditAddModal(boolean) {
      this.isShowEditAddModal = boolean;

      this.editAddForm = {};
      if (boolean && this.$refs.singleFileupload) {
        this.$refs.singleFileupload.reset();
      }
    },
    setShowDeleteModal(boolean, id) {
      this.isShowDeleteModal = boolean;
      this.activeDeleteId = id || -1;
    },

    submitEditAddForm() {
      const { logo_url } = this.editAddForm;
      if (!logo_url) return this.$toast.warning("Please upload an image.");

      this.createPartner(this.editAddForm);
      this.setShowEditAddModal(false);
    },

    setEditAddImage(image) {
      if (image) this.imageToUrlConverter(image);
    },
    removeEditAddImage() {
      this.editAddForm = {
        logo_url: "",
      };
      this.$refs.singleFileupload.reset();
    },
    async imageToUrlConverter(image) {
      this.isUploadingSingleImage = true;

      try {
        const imageFile = image;
        const imageName = imageFile.name;
        const metaData = {
          contentType: imageFile.type,
        };

        const imageRef = storageRef.child(`uploads/${imageName}`);
        await imageRef.put(imageFile, metaData);

        const downloadUrl = await imageRef.getDownloadURL();

        this.editAddForm.logo_url = downloadUrl;
        this.isUploadingSingleImage = false;
      } catch (error) {
        console.error(error);

        this.$toast.warning(
          "Upload Image Failed, Please Try Again With Another Image."
        );
        this.isUploadingSingleImage = false;
      }
    },
  },
};
</script>

<style></style>
