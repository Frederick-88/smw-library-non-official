import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSlickCarousel from "vue-slick-carousel";

const options = {
  position: "top-center",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  icon: true,
};

Vue.use(Toast, options);
Vue.use(firestorePlugin); // defined so we can use 'firestore: {}' in a vue component.

Vue.component("VueSlickCarousel", VueSlickCarousel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
