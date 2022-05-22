import {
  database,
  fbCreateBookCollection,
  fbUpdateBookCollection,
  fbDeleteBookCollection,
} from "@/firebase/db";

const BookCollectionsStore = {
  namespaced: true,
  state: {
    bookCollectionList: [],
    isFetchingBookCollection: false,
    isDeletingBookCollection: false,
  },
  getters: {},
  mutations: {
    setBookCollectionList(state, data) {
      state.bookCollectionList = data;
    },
    setIsFetchingBookCollection(state, boolean) {
      state.isFetchingBookCollection = boolean;
    },
    setIsDeletingBookCollection(state, boolean) {
      state.isDeletingBookCollection = boolean;
    },
  },
  actions: {
    async fetchBookCollection({ commit }) {
      commit("setIsFetchingBookCollection", true);

      database
        .collection("library-book-collections")
        .get()
        .then((querySnapshot) => {
          const results = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          results.sort((a, b) => a.title.localeCompare(b.title)); // sort by alphabetical order

          commit("setBookCollectionList", results);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          commit("setIsFetchingBookCollection", false);
        });
    },
    async createBookCollection({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingBookCollection", true);

        await fbCreateBookCollection(data);
        dispatch("fetchBookCollection");

        this._vm.$toast.success("Successfully Created Book Collection.");
      } catch (error) {
        console.error(error);
      }
    },
    async updateBookCollection({ dispatch, commit }, data) {
      try {
        commit("setIsFetchingBookCollection", true);

        await fbUpdateBookCollection(data.id, data);
        dispatch("fetchBookCollection");

        this._vm.$toast.success("Successfully Updated Book Collection.");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBookCollection({ dispatch, commit }, id) {
      try {
        commit("setIsDeletingBookCollection", true);
        await fbDeleteBookCollection(id);
        commit("setIsDeletingBookCollection", false);

        dispatch("fetchBookCollection");

        this._vm.$toast.success("Successfully Deleted Book Collection.");
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default BookCollectionsStore;
