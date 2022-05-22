<template>
  <div class="contact-us-page d-flex flex-column align-center">
    <template v-if="isFetchingLibraryDetail">
      <Loader icon="mdi-contacts" />
    </template>

    <template v-else>
      <h2 class="contact-us-title text-center mb-3 mb-sm-5">Hubungi Kami</h2>

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

      <div class="contact-list mt-3 mt-sm-8">
        <div
          class="contact__list-item d-flex align-center my-3 my-sm-5"
          v-for="(contact, key) in contactList"
          :key="contact.name"
        >
          <v-icon class="item-key" color="yellow darken-4">{{
            getContactIcon(key)
          }}</v-icon>
          <p class="mx-5 my-0">:</p>
          <p class="item-title ma-0">{{ contact }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/utilities/Loader.vue";

export default {
  name: "ContactUsPage",
  components: {
    Loader,
  },
  computed: {
    ...mapState("libraryDetails", [
      "libraryDetails",
      "isFetchingLibraryDetail",
    ]),
    contactList() {
      return (
        (this.libraryDetails[0] && this.libraryDetails[0].contact_details) || {}
      );
    },
  },
  methods: {
    getContactIcon(key) {
      let icon = "";

      switch (key) {
        case "whatsapp_number":
          icon = "mdi-whatsapp";
          break;

        case "email":
          icon = "mdi-email-outline";
          break;

        case "phone_number":
          icon = "mdi-phone-outline";
          break;

        default:
          break;
      }

      return icon;
    },
  },
};
</script>

<style lang="scss">
.contact-us-page {
  margin-top: 140px;

  .contact-us-title {
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .contact__list-item {
    .item-title {
      letter-spacing: 2px;
    }
  }

  @include mobile {
    margin-top: 120px;

    .contact-us-title {
      font-size: 1.25rem;
      letter-spacing: 1px;
    }

    .contact__list-item {
      font-size: 0.875rem;
    }
  }
}
</style>
