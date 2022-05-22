<template>
  <div class="admin-library-details">
    <BrowseLayout
      header-title="Contact Details"
      header-icon="mdi-account-box-outline"
      :is-loading="isFetchingLibraryDetail"
      :is-show-add-button="false"
    >
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Feedback Link</th>
              <th class="text-left">Whatsapp</th>
              <th class="text-left">Email</th>
              <th class="text-left">Phone Number</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ getLibraryDetails.feedback_link }}</td>
              <td>{{ getLibraryDetails.contact_details.whatsapp_number }}</td>
              <td>{{ getLibraryDetails.contact_details.email }}</td>
              <td>{{ getLibraryDetails.contact_details.phone_number }}</td>
              <td class="button-list">
                <v-btn
                  title="Update"
                  outlined
                  class="mr-3"
                  @click="setShowContactEditModal(true)"
                  ><v-icon small>mdi-pencil</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </BrowseLayout>
    <EditAddModal
      :is-show="isShowContactEditModal"
      :is-update="true"
      entity-name=""
      subject-text="Contact Details"
      @close="setShowContactEditModal(false)"
      @submit="submitContactEditForm"
    >
      <div class="edit-add-modal__content">
        <v-text-field
          v-model="libraryDetailsForm.feedback_link"
          label="Feedback Link"
        ></v-text-field>
        <v-text-field
          v-model="libraryDetailsForm.contact_details.whatsapp_number"
          label="Whatsapp Number"
        ></v-text-field>
        <v-text-field
          v-model="libraryDetailsForm.contact_details.email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="libraryDetailsForm.contact_details.phone_number"
          label="phone_number"
        ></v-text-field>
      </div>
    </EditAddModal>

    <BrowseLayout
      header-title="Organization Structure"
      header-icon="mdi-sitemap-outline"
      :is-loading="isFetchingLibraryDetail"
      :is-show-add-button="false"
    >
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Organization Structure Image</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  class="image-thumbnail image--large"
                  :src="getLibraryDetails.organization_image"
                />
              </td>
              <td class="button-list">
                <v-btn
                  title="Update"
                  outlined
                  class="mr-3"
                  @click="setShowOrganizationEditModal(true)"
                  ><v-icon small>mdi-pencil</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </BrowseLayout>
    <EditAddModal
      :is-show="isShowOrganizationEditModal"
      :is-update="true"
      entity-name=""
      subject-text="Organization Structure"
      :is-loading="isUploadingSingleImage"
      @close="setShowOrganizationEditModal(false)"
      @submit="submitOrganizationEditForm"
    >
      <div class="edit-add-modal__content">
        <v-file-input
          ref="singleFileupload"
          label="Organization Structure Image Thumbnail"
          accept="image/*"
          show-size
          truncate-length="50"
          @change="setOrganizationEditImage($event)"
        ></v-file-input>
        <div class="modal__image-container">
          <img
            class="modal__image"
            :src="libraryDetailsForm.organization_image"
          />
          <v-btn
            class="modal__image-delete-button"
            title="Delete"
            icon
            @click="removeOrganizationEditImage"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </div>
      </div>
    </EditAddModal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import cloneDeep from "lodash.clonedeep";
import { storageRef } from "@/firebase/db";

import BrowseLayout from "@/layouts/BrowseLayout.vue";
import EditAddModal from "@/layouts/EditAddModal.vue";

import adminAuthMixins from "@/mixins/admin-auth-mixins.js";

export default {
  name: "AdminLibraryDetails",
  mixins: [adminAuthMixins],
  components: {
    BrowseLayout,
    EditAddModal,
  },
  data() {
    return {
      isShowContactEditModal: false,
      isShowOrganizationEditModal: false,
      libraryDetailsForm: {
        organization_image: "",
        feedback_link: "",
        contact_details: {
          whatsapp_number: "",
          email: "",
          phone_number: "",
        },
      },

      isUploadingSingleImage: false,
    };
  },
  computed: {
    ...mapState("libraryDetails", [
      "libraryDetails",
      "isFetchingLibraryDetail",
    ]),
    getLibraryDetails() {
      if (this.libraryDetails.length) return this.libraryDetails[0];
      else
        return {
          organization_image: "",
          feedback_link: "",
          contact_details: {
            whatsapp_number: "",
            email: "",
            phone_number: "",
          },
        };
    },
  },
  watch: {
    libraryDetails: {
      handler(val) {
        if (this.libraryDetails.length)
          this.libraryDetailsForm = cloneDeep(this.libraryDetails[0]); // so table data won't affected
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions("libraryDetails", ["updateLibraryDetail"]),
    setShowOrganizationEditModal(boolean) {
      this.isShowOrganizationEditModal = boolean;
    },
    setOrganizationEditImage(image) {
      if (image) this.imageToUrlConverter(image);
    },
    removeOrganizationEditImage() {
      this.libraryDetailsForm = {
        id: this.libraryDetailsForm.id,
        organization_image: "",
        feedback_link: this.libraryDetailsForm.feedback_link,
        contact_details: this.libraryDetailsForm.contact_details,
      };

      this.$refs.singleFileupload.reset();
    },
    submitOrganizationEditForm() {
      const { contact_details, organization_image, feedback_link } =
        this.libraryDetailsForm;

      if (
        !organization_image ||
        !feedback_link ||
        !contact_details.whatsapp_number ||
        !contact_details.email ||
        !contact_details.phone_number
      )
        return this.$toast.warning("Please fill the empty inputs.");

      this.updateLibraryDetail(this.libraryDetailsForm);
      this.setShowOrganizationEditModal(false);
    },

    setShowContactEditModal(boolean) {
      this.isShowContactEditModal = boolean;
    },
    submitContactEditForm() {
      const { contact_details, organization_image, feedback_link } =
        this.libraryDetailsForm;

      if (
        !feedback_link ||
        !contact_details.whatsapp_number ||
        !contact_details.email ||
        !contact_details.phone_number
      )
        return this.$toast.warning("Please fill the empty inputs.");

      this.updateLibraryDetail(this.libraryDetailsForm);
      this.setShowContactEditModal(false);
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

        this.libraryDetailsForm.organization_image = downloadUrl;
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

<style lang="scss">
.admin-library-details {
  .browse-layout {
    &:nth-of-type(2) {
      margin-top: 70px;
    }
  }
}
</style>
