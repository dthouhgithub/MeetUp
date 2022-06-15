import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filter/date";
import AlertComponent from "./components/Shared/AlertComponent.vue";
import { firestorePlugin } from "vuefire";

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.filter("date", DateFilter);
Vue.component("alert-component", AlertComponent);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    this.$store.dispatch("loadMeetups");
  },
}).$mount("#app");
