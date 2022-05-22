import { database, fbCreatePartner, fbDeletePartner } from "@/firebase/db";

const PartnersStore = {
  namespaced: true,
  state: {
    partnerList: [],
    isFetchingPartner: false,
    isDeletingPartner: false,
  },
  getters: {},
  mutations: {
    setPartnerList(state, data) {
      state.partnerList = data;
    },
    setIsFetchingPartner(state, boolean) {
      state.isFetchingPartner = boolean;
    },
    setIsDeletingPartner(state, boolean) {
      state.isDeletingPartner = boolean;
    },
  },
  actions: {
    async fetchPartner({ commit }) {
      commit("setIsFetchingPartner", true);

      database
        .collection("library-partners")
        .get()
        .then((querySnapshot) => {
          const results = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          commit("setPartnerList", results);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          commit("setIsFetchingPartner", false);
        });
    },
    async createPartner({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingPartner", true);

        await fbCreatePartner(data);
        dispatch("fetchPartner");

        this._vm.$toast.success("Successfully Created Partner.");
      } catch (error) {
        console.error(error);
      }
    },
    async deletePartner({ dispatch, commit }, id) {
      try {
        commit("setIsDeletingPartner", true);
        await fbDeletePartner(id);
        commit("setIsDeletingPartner", false);

        dispatch("fetchPartner");

        this._vm.$toast.success("Successfully Deleted Partner.");
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default PartnersStore;
