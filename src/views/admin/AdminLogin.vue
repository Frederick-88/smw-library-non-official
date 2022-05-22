<template>
  <div class="admin-login d-flex justify-center align-center">
    <div
      class="admin-login__container pa-5 white--text black elevation-24 rounded-lg"
    >
      <h3 class="text-h5 mb-2 yellow--text text--accent-4 font-weight-bold">
        Login as Admin
      </h3>
      <p class="subtitle-2 grey--text text--lighten-1 font-weight-medium">
        Log in with an admin account to make updates to SMA Maitreyawira library
        content.
      </p>

      <div class="mt-9 mb-5">
        <v-text-field
          v-model="loginForm.email"
          prepend-inner-icon="mdi-email-outline"
          label="Email"
          dark
          outlined
          color="yellow accent-4"
          :loading="isLoggingIn"
          :disabled="isLoggingIn"
          autocomplete="new-password"
        >
        </v-text-field>
        <v-text-field
          v-model="loginForm.password"
          prepend-inner-icon="mdi-lock-outline"
          :append-icon="
            isShowPasswordForm ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          label="Password"
          :type="isShowPasswordForm ? 'text' : 'password'"
          dark
          outlined
          color="yellow accent-4"
          :loading="isLoggingIn"
          :disabled="isLoggingIn"
          autocomplete="new-password"
          @click:append="isShowPasswordForm = !isShowPasswordForm"
        >
        </v-text-field>
      </div>

      <div class="d-flex justify-center">
        <v-btn
          color="yellow accent-4"
          class="col-8"
          max-width="300px"
          @click="submitForm"
        >
          Submit
        </v-btn>
      </div>
      <div class="d-flex justify-center mt-5 mb-3">
        <v-btn class="col-8" max-width="300px" @click="loginAsVisitor">
          Proceed as Visitor
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetmapGetters, mapGetters, mapMutations } from "vuex";

export default {
  name: "AdminLogin",
  data() {
    return {
      isLoggingIn: false,
      isShowPasswordForm: false,
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isAdmin", "isVisitor"]),
  },
  mounted() {
    this.checkAdminAuth();
  },
  methods: {
    ...mapMutations(["setAdminToken", "setVisitorRole"]),
    submitForm() {
      this.isLoggingIn = true;

      setTimeout(() => {
        if (
          this.loginForm.email === process.env.VUE_APP_ADMIN_EMAIL &&
          this.loginForm.password === process.env.VUE_APP_ADMIN_PASSWORD
        ) {
          const randomId = Date.now();
          this.setAdminToken(randomId);
          this.$router.push("/admin/facilities");
          this.$toast.success("Successfully logged in as an admin.");
        } else {
          this.$toast.error(
            "Incorrect admin account credentials, please try again."
          );
        }
        this.isLoggingIn = false;
      }, 1200);
    },
    loginAsVisitor() {
      this.setVisitorRole();
      this.$router.push("/admin/facilities");
      this.$toast.success("Successfully logged in as visitor.");
    },
    checkAdminAuth() {
      if (this.isAdmin) {
        this.$router.push({ path: "/admin/facilities" });
        this.$toast.success("Welcome back, admin.");
      }
      if (this.isVisitor) {
        this.$router.push({ path: "/admin/facilities" });
        this.$toast.success("Welcome back, visitor.");
      }
      return;
    },
  },
};
</script>

<style lang="scss">
.admin-login {
  height: 100vh;
  width: 100%;
  background-image: url("https://www.maitreyawira-batam.sch.id/image/background/BG-Home-SMA.jpg");
  background-size: cover;
  background-position: bottom;

  .admin-login__container {
    width: 30vw;
    max-width: 550px;
    min-width: 450px;
  }

  .v-input,
  .v-label {
    font-size: 0.875rem;
  }

  .v-icon {
    font-size: 1.25rem;
  }

  .v-label--active {
    transform: translateY(-27px) scale(0.9) !important;
    background: black;
    padding-right: 3px;
  }

  // -----
  // Input Autofills styling
  // -----
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px black inset !important;
  }

  /*Change text in autofill textbox*/
  input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
  }
}
</style>
