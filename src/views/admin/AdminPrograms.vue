<template>
  <div class="admin-programs">
    <BrowseLayout
      header-title="Programs"
      header-icon="mdi-calendar-range-outline"
      subject-text="Program"
      :is-loading="isFetchingProgram"
      @onclick-create-button="setShowEditAddModal(true)"
    >
      <v-simple-table fixed-header :height="adminTableHeight">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Title</th>
              <th class="text-left">Description</th>
              <th class="text-left">Thumbnail</th>
              <th class="text-left">Date (yyyy-mm-dd)</th>
              <th class="text-left">Images</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="program in programList" :key="program.id">
              <td>{{ program.id }}</td>
              <td>{{ program.title }}</td>
              <td>
                <p class="ellipsis">{{ program.description }}</p>
              </td>
              <td>
                <img class="image-thumbnail" :src="program.image_thumbnail" />
              </td>
              <td>{{ program.date }}</td>
              <td>{{ program.images.length }}</td>
              <td class="button-list">
                <v-btn
                  title="View"
                  outlined
                  class="mr-3"
                  @click="setShowViewModal(true, program)"
                  ><v-icon small>mdi-eye</v-icon></v-btn
                >
                <v-btn
                  title="Update"
                  outlined
                  class="mr-3"
                  @click="setShowEditAddModal(true, true, program)"
                  ><v-icon small>mdi-pencil</v-icon></v-btn
                >
                <v-btn
                  title="Delete"
                  outlined
                  @click="setShowDeleteModal(true, program.id)"
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
      subject-text="Program"
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
          <h6 class="text-subtitle-1 font-weight-medium">Description</h6>
          <p class="text-body-2 text--secondary">
            ⊛ {{ activeViewData.description }}
          </p>
        </div>
        <div class="content-list">
          <h6 class="text-subtitle-1 font-weight-medium">Date</h6>
          <p class="text-body-2 text--secondary">⊛ {{ activeViewData.date }}</p>
        </div>
        <div class="content-list">
          <h6 class="text-subtitle-1 font-weight-medium">Image Thumbnail</h6>
          <img
            class="view-modal__image"
            :src="activeViewData.image_thumbnail"
          />
        </div>
        <div class="content-list">
          <h6 class="text-subtitle-1 font-weight-medium">Images</h6>
          <div class="d-flex align-center flex-wrap">
            <img
              class="view-modal__image"
              v-for="image in activeViewData.images"
              :key="image"
              :src="image"
            />
          </div>
        </div>
      </div>
    </ViewModal>

    <EditAddModal
      :is-show="isShowEditAddModal"
      :is-update="isEditing"
      :entity-name="activeEditAddTitle"
      subject-text="Program"
      :is-loading="isUploadingSingleImage || isUploadingMultipleImage"
      @close="setShowEditAddModal(false, false)"
      @submit="submitEditAddForm"
    >
      <div class="edit-add-modal__content">
        <v-text-field v-model="editAddForm.title" label="Title"></v-text-field>

        <v-text-field
          v-model="editAddForm.description"
          label="Description"
        ></v-text-field>

        <v-menu
          v-model="isShowEditAddDatepicker"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="editAddForm.date"
              label="Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="editAddForm.date"
            @input="isShowEditAddDatepicker = false"
          ></v-date-picker>
        </v-menu>

        <v-file-input
          ref="singleFileupload"
          label="Program Image Thumbnail"
          accept="image/*"
          show-size
          truncate-length="50"
          @change="setSingleEditAddImage($event)"
        ></v-file-input>
        <div v-if="editAddForm.image_thumbnail" class="modal__image-container">
          <img class="modal__image" :src="editAddForm.image_thumbnail" />
          <v-btn
            class="modal__image-delete-button"
            title="Delete"
            icon
            @click="removeEditAddImage('thumbnail')"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </div>

        <v-file-input
          :label="multipleFileInputText"
          accept="image/*"
          chips
          counter
          multiple
          show-size
          truncate-length="50"
          @change="setMultipleEditAddImage($event)"
        ></v-file-input>
        <div v-if="editAddForm.images.length" class="modal__image-list d-flex">
          <div
            class="modal__image-container"
            v-for="(image, index) in editAddForm.images"
            :key="image"
          >
            <img class="modal__image" :src="image" />
            <v-btn
              class="modal__image-delete-button"
              title="Delete"
              icon
              @click="removeEditAddImage('images', index)"
              ><v-icon x-small>mdi-close</v-icon></v-btn
            >
          </div>
        </div>
      </div>
    </EditAddModal>

    <DeleteModal
      :is-show="isShowDeleteModal"
      type="program"
      delete-subject="program"
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
  name: "AdminPrograms",
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
      isShowEditAddDatepicker: false,
      activeEditAddTitle: "",
      editAddForm: {
        title: "",
        description: "",
        date: new Date(Date.now()).toISOString().substr(0, 10), // initial value of get today date format in '2022-05-09' with local timezone
        image_thumbnail: "",
        images: [],
      },

      isShowDeleteModal: false,
      activeDeleteId: -1,

      isUploadingMultipleImage: false,
      isUploadingSingleImage: false,
    };
  },
  computed: {
    ...mapState("programs", ["programList", "isFetchingProgram"]),
    multipleFileInputText() {
      const imagesLength = this.editAddForm.images.length || 0;
      let text = `Program Images`;
      text += ` (${imagesLength} Files Uploaded)`;

      return text;
    },
  },
  methods: {
    ...mapActions("programs", ["createProgram", "updateProgram"]),
    setShowViewModal(boolean, data) {
      this.isShowViewModal = boolean;
      this.activeViewData = data || {};
    },
    setShowEditAddModal(boolean, isEdit, data = { images: [] }) {
      this.isShowEditAddModal = boolean;
      this.isEditing = !!isEdit;
      this.activeEditAddTitle = data.title || "";

      if (!data.date)
        data.date = new Date(Date.now()).toISOString().substr(0, 10);
      this.editAddForm = cloneDeep(data); // avoid mutating the program object directly, so change won't be applied to table data

      if (boolean && this.$refs.singleFileupload) {
        this.$refs.singleFileupload.reset();
      }
    },
    setShowDeleteModal(boolean, id) {
      this.isShowDeleteModal = boolean;
      this.activeDeleteId = id || -1;
    },

    submitEditAddForm() {
      const { title, description, date, image_thumbnail, images } =
        this.editAddForm;

      if (!title || !description || !date || !image_thumbnail || !images.length)
        return this.$toast.warning("Please fill the empty inputs.");

      if (this.isEditing) this.updateProgram(this.editAddForm);
      else this.createProgram(this.editAddForm);

      this.setShowEditAddModal(false);
    },

    removeEditAddImage(type, index) {
      const isMultiple = type === "images";

      if (isMultiple) {
        this.editAddForm.images.splice(index, 1);
      } else {
        this.editAddForm = {
          id: this.editAddForm.id || -1,
          title: this.editAddForm.title,
          description: this.editAddForm.description,
          date: this.editAddForm.date,
          image_thumbnail: "",
          images: this.editAddForm.images,
        };

        this.$refs.singleFileupload.reset();
      }
    },
    setSingleEditAddImage(image) {
      if (!image) return;

      this.imageToUrlConverter(false, image);
    },
    setMultipleEditAddImage(imageList) {
      if (!imageList.length) return;

      this.imageToUrlConverter(true, imageList);
    },
    async imageToUrlConverter(isMultiple = false, imageList) {
      if (isMultiple) {
        this.isUploadingMultipleImage = true;
        const expectedImageListNumber =
          imageList.length + this.editAddForm.images.length;

        const completeCheckerCallback = () => {
          if (this.editAddForm.images.length === expectedImageListNumber) {
            this.isUploadingMultipleImage = false;
          }
        };

        try {
          imageList.forEach(async (image) => {
            const imageFile = image;
            const imageName = imageFile.name;
            const metaData = {
              contentType: imageFile.type,
            };

            const imageRef = storageRef.child(`uploads/${imageName}`);
            await imageRef.put(imageFile, metaData);

            const downloadUrl = await imageRef.getDownloadURL();
            this.editAddForm.images.push(downloadUrl);
            completeCheckerCallback();
          });
        } catch (error) {
          console.error(error);
          this.editAddForm.images.push("");
          completeCheckerCallback();
        }
      } else {
        this.isUploadingSingleImage = true;

        try {
          const imageFile = imageList;
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
      }
    },
  },
};
</script>

<style></style>
