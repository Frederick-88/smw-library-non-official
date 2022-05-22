import Vue from "vue";
import Vuex from "vuex";
import Cookies from "universal-cookie";

import FacilitiesStore from "./facilities-store";
import ProgramsStore from "./programs-store";
import BookCollectionsStore from "./book-collections-store";
import PartnersStore from "./partners-store";
import LibraryDetailsStore from "./library-details-store";

Vue.use(Vuex);
const cookies = new Cookies();

export default new Vuex.Store({
  modules: {
    facilities: FacilitiesStore,
    programs: ProgramsStore,
    bookCollections: BookCollectionsStore,
    partners: PartnersStore,
    libraryDetails: LibraryDetailsStore,
  },
  state: {
    adminToken: cookies.get("admin-token"),
    userRole: cookies.get("admin-token") ? "admin" : "",
  },
  getters: {
    isAdmin: (state) => {
      return state.userRole === "admin" && state.adminToken;
    },
    isVisitor: (state) => {
      return state.userRole === "visitor";
    },
  },
  mutations: {
    setAdminToken(state, token) {
      cookies.set("admin-token", token, {
        path: "/", // use / as the path if you want your cookie to be accessible on all pages
        expires: new Date(Date.now() + 2592000), // 1 day
      });
      state.adminToken = token;
      state.userRole = "admin";
    },
    setVisitorRole(state) {
      state.userRole = "visitor";
    },
    doLogout(state) {
      cookies.remove("admin-token", { path: "/" });
      state.adminToken = "";
      state.userRole = "";
    },
  },
  actions: {},
});
