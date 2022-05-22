import { database, fbUpdateLibraryDetail } from "@/firebase/db";

const LibraryDetailsStore = {
  namespaced: true,
  state: {
    libraryDetails: [],
    isFetchingLibraryDetail: false,
  },
  getters: {},
  mutations: {
    setLibraryDetail(state, data) {
      state.libraryDetails = data;
    },
    setIsFetchingLibraryDetail(state, boolean) {
      state.isFetchingLibraryDetail = boolean;
    },
  },
  actions: {
    async fetchLibraryDetail({ commit }) {
      commit("setIsFetchingLibraryDetail", true);

      database
        .collection("library-details")
        .get()
        .then((querySnapshot) => {
          const results = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          commit("setLibraryDetail", results);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          commit("setIsFetchingLibraryDetail", false);
        });
    },
    async updateLibraryDetail({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingLibraryDetail", true);

        await fbUpdateLibraryDetail(data.id, data);
        dispatch("fetchLibraryDetail");

        this._vm.$toast.success("Successfully Updated Library Detail.");
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default LibraryDetailsStore;
