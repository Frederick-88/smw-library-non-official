import { mapGetters } from "vuex";

const adminAuthMixins = {
  computed: {
    ...mapGetters(["isAdmin", "isVisitor"]),
  },
  mounted() {
    this.checkNonAdminAuth();
  },
  methods: {
    checkNonAdminAuth() {
      if (!this.isAdmin && !this.isVisitor) {
        this.$toast.warning("Please login first.");
        this.$router.push({ path: "/admin/login" });
      }
      return;
    },
  },
};

export default adminAuthMixins;
