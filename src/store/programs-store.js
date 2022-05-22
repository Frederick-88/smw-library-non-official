import {
  database,
  fbCreateProgram,
  fbUpdateProgram,
  fbDeleteProgram,
} from "@/firebase/db";

const ProgramsStore = {
  namespaced: true,
  state: {
    programList: [],
    isFetchingProgram: false,
    isDeletingProgram: false,
  },
  getters: {},
  mutations: {
    setProgramList(state, data) {
      state.programList = data;
    },
    setIsFetchingProgram(state, boolean) {
      state.isFetchingProgram = boolean;
    },
    setIsDeletingProgram(state, boolean) {
      state.isDeletingProgram = boolean;
    },
  },
  actions: {
    async fetchProgram({ commit }) {
      commit("setIsFetchingProgram", true);

      database
        .collection("library-programs")
        .get()
        .then((querySnapshot) => {
          const results = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          results.sort((a, b) => a.title.localeCompare(b.title)); // sort by alphabetical order

          commit("setProgramList", results);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          commit("setIsFetchingProgram", false);
        });
    },
    async createProgram({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingProgram", true);

        await fbCreateProgram(data);
        dispatch("fetchProgram");

        this._vm.$toast.success("Successfully Created Program.");
      } catch (error) {
        console.error(error);
      }
    },
    async updateProgram({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingProgram", true);
        await fbUpdateProgram(data.id, data);
        dispatch("fetchProgram");

        this._vm.$toast.success("Successfully Updated Program.");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteProgram({ dispatch, commit }, id) {
      try {
        commit("setIsDeletingProgram", true);
        await fbDeleteProgram(id);
        commit("setIsDeletingProgram", false);

        dispatch("fetchProgram");

        this._vm.$toast.success("Successfully Deleted Program.");
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default ProgramsStore;
