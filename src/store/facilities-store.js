import {
  database,
  fbCreateFacility,
  fbUpdateFacility,
  fbDeleteFacility,
} from "@/firebase/db";

const FacilitiesStore = {
  namespaced: true,
  state: {
    facilityList: [],
    isFetchingFacility: false,
    isDeletingFacility: false,
  },
  getters: {},
  mutations: {
    setFacilityList(state, data) {
      state.facilityList = data;
    },
    setIsFetchingFacility(state, boolean) {
      state.isFetchingFacility = boolean;
    },
    setIsDeletingFacility(state, boolean) {
      state.isDeletingFacility = boolean;
    },
  },
  actions: {
    async fetchFacility({ commit }) {
      commit("setIsFetchingFacility", true);

      database
        .collection("library-facilities")
        .get()
        .then((querySnapshot) => {
          const results = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          results.sort((a, b) => a.title.localeCompare(b.title)); // sort by alphabetical order

          commit("setFacilityList", results);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          commit("setIsFetchingFacility", false);
        });
    },
    async createFacility({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingFacility", true);

        await fbCreateFacility(data);
        dispatch("fetchFacility");

        this._vm.$toast.success("Successfully Created Facility.");
      } catch (error) {
        console.error(error);
      }
    },
    async updateFacility({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingFacility", true);

        await fbUpdateFacility(data.id, data);
        dispatch("fetchFacility");

        this._vm.$toast.success("Successfully Updated Facility.");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFacility({ dispatch, commit }, id) {
      try {
        commit("setIsDeletingFacility", true);
        await fbDeleteFacility(id);
        commit("setIsDeletingFacility", false);

        dispatch("fetchFacility");

        this._vm.$toast.success("Successfully Deleted Facility.");
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default FacilitiesStore;
