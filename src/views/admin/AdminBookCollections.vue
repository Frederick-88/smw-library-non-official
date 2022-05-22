<template>
  <div class="admin-book-collections">
    <BrowseLayout
      header-title="Book Collections"
      header-icon="mdi-book-open-variant"
      subject-text="Book Collection"
      :is-loading="isFetchingBookCollection"
      @onclick-create-button="setShowEditAddModal(true)"
    >
      <v-simple-table fixed-header :height="adminTableHeight">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Title</th>
              <th class="text-left">Image Thumbnail</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="bookCollection in bookCollectionList"
              :key="bookCollection.id"
            >
              <td>{{ bookCollection.id }}</td>
              <td>{{ bookCollection.title }}</td>
              <td>
                <img
                  class="image-thumbnail"
                  :src="bookCollection.image_thumbnail"
                />
              </td>
              <td class="button-list">
                <v-btn
                  title="View"
                  outlined
                  class="mr-3"
                  @click="setShowViewModal(true, bookCollection)"
                  ><v-icon small>mdi-eye</v-icon></v-btn
                >
                <v-btn
                  title="Update"
                  outlined
                  class="mr-3"
                  @click="setShowEditAddModal(true, true, bookCollection)"
                  ><v-icon small>mdi-pencil</v-icon></v-btn
                >
                <v-btn
                  title="Delete"
                  outlined
                  @click="setShowDeleteModal(true, bookCollection.id)"
                  ><v-icon small>mdi-trash-can</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </BrowseLayout>

    <ViewModal
      :is-show="isShowViewModal"
      subject-text="Book Collection"
      @close="setShowViewModal(false)"
    >
      <div class="view-modal__content">
        <div class="content-list">
          <h6 class="text-subtitle-1 font-weight-medium">Id</h6>
          <p class="text-body-2 text--secondary">⊛ {{ activeViewData.id }}</p>
        </div>
        <div class="content-list">
          <h6 class="text-subtitle-1 font-weight-medium">Title</h6>
          <p class="text-body-2 text--secondary">
            ⊛ {{ activeViewData.title }}
          </p>
        </div>
        <div class="content-list">
          <h6 class="text-subtitle-1 font-weight-medium">Image Thumbnail</h6>
          <img
            class="view-modal__image"
            :src="activeViewData.image_thumbnail"
          />
        </div>
      </div>
    </ViewModal>

    <EditAddModal
      :is-show="isShowEditAddModal"
      :is-update="isEditing"
      :entity-name="activeEditTitle"
      subject-text="Book Collection"
      :is-loading="isUploadingSingleImage"
      @close="setShowEditAddModal(false)"
      @submit="submitEditAddForm"
    >
      <div class="edit-add-modal__content">
        <v-text-field v-model="editAddForm.title" label="Title"></v-text-field>

        <v-file-input
          ref="singleFileupload"
          label="Book Collection Image Thumbnail"
          accept="image/*"
          show-size
          truncate-length="50"
          @change="setEditAddImage($event)"
        ></v-file-input>
        <div v-if="editAddForm.image_thumbnail" class="modal__image-container">
          <img class="modal__image" :src="editAddForm.image_thumbnail" />
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
      type="book-collection"
      delete-subject="book collection"
      :id="activeDeleteId"
      @close="setShowDeleteModal(false)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import cloneDeep from "lodash.clonedeep";
import { storageRef } from "@/firebase/db";

import BrowseLayout from "@/layouts/BrowseLayout.vue";
import ViewModal from "@/layouts/ViewModal.vue";
import EditAddModal from "@/layouts/EditAddModal.vue";
import DeleteModal from "@/components/utilities/DeleteModal.vue";

import adminAuthMixins from "@/mixins/admin-auth-mixins.js";
import globalMixins from "@/mixins/global-mixins.js";

export default {
  name: "AdminBookCollections",
  mixins: [adminAuthMixins, globalMixins],
  components: {
    BrowseLayout,
    ViewModal,
    EditAddModal,
    DeleteModal,
  },
  data() {
    return {
      isShowViewModal: false,
      activeViewData: {},

      isShowEditAddModal: false,
      isEditing: false,
      activeEditTitle: "",
      editAddForm: {},

      isShowDeleteModal: false,
      activeDeleteId: -1,

      isUploadingSingleImage: false,
    };
  },
  computed: {
    ...mapState("bookCollections", [
      "bookCollectionList",
      "isFetchingBookCollection",
    ]),
  },
  methods: {
    ...mapActions("bookCollections", [
      "createBookCollection",
      "updateBookCollection",
    ]),
    setShowViewModal(boolean, data) {
      this.isShowViewModal = boolean;
      this.activeViewData = data || {};
    },
    setShowEditAddModal(boolean, isEdit, data = {}) {
      this.isShowEditAddModal = boolean;
      this.isEditing = !!isEdit;
      this.editAddForm = cloneDeep(data); // avoid mutating the object directly, so change won't be applied to table data
      this.activeEditTitle = data.title || "";

      if (boolean && this.$refs.singleFileupload) {
        this.$refs.singleFileupload.reset();
      }
    },
    setShowDeleteModal(boolean, id) {
      this.isShowDeleteModal = boolean;
      this.activeDeleteId = id || -1;
    },

    submitEditAddForm() {
      const { title, image_thumbnail } = this.editAddForm;

      if (!title || !image_thumbnail)
        return this.$toast.warning("Please fill the empty inputs.");

      if (this.isEditing) this.updateBookCollection(this.editAddForm);
      else this.createBookCollection(this.editAddForm);

      this.setShowEditAddModal(false);
    },

    setEditAddImage(image) {
      if (image) this.imageToUrlConverter(image);
    },
    removeEditAddImage() {
      this.editAddForm = {
        id: this.editAddForm.id || -1,
        title: this.editAddForm.title,
        image_thumbnail: "",
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

        this.editAddForm.image_thumbnail = downloadUrl;
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
