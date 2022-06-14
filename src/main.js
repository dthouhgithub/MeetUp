import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filter/date";
import { initializeApp } from "firebase/app";
import AlertComponent from "./components/Shared/AlertComponent.vue";

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("alert-component", AlertComponent);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    initializeApp({
      apiKey: "AIzaSyCMx3hZN3sgkhsbpyJHaCMArpHwu4zWrBY",
      authDomain: "meetup-23683.firebaseapp.com",
      projectId: "meetup-23683",
      storageBucket: "meetup-23683.appspot.com",
      messagingSenderId: "47320449056",
      appId: "1:47320449056:web:514d3fde3bac0913f87c45",
      measurementId: "G-J4F8JLQM47",
    });
  },
}).$mount("#app");
