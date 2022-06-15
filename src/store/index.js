import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Vue from "vue";
import Vuex from "vuex";
import app from "./../firebaseInit.js";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: null,
    user: null,
    loading: false,
    error: null,
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id == meetupId;
        });
      };
    },
    getUser(state) {
      return state.user;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoadedMeetup(state, payload) {
      state.loadedMeetups = payload;
    },
  },
  actions: {
    async loadMeetups({ commit }) {
      commit("setLoading", true);
      const db = getFirestore(app);
      const meetups = [];
      await getDocs(collection(db, "meetups"))
        .then((data) => {
          data.forEach((doc) => {
            data = doc.data();
            meetups.push({
              id: doc.id,
              title: data.title,
              date: data.date,
              description: data.description,
              location: data.location,
              imageUrl: data.imageUrl,
            });
          });
          commit("setLoadedMeetup", meetups);
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", true);
          console.log(error);
        });
    },
    async createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
      };
      const db = getFirestore(app);
      await addDoc(collection(db, "meetups"), meetup)
        .then((data) => {
          commit("createMeetup", {
            ...meetup,
            id: data.id,
          });
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error.code);
        });
    },

    signUpUser({ commit }, payload) {
      commit("setLoading", true);
      createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then((data) => {
          commit("setLoading", false);
          const newUser = {
            id: data.user.uid,
            registeredMeetup: [],
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error.code);
        });
    },
    signInUser({ commit }, payload) {
      commit("setLoading", true);
      signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then((data) => {
          commit("setLoading", false);
          const user = {
            id: data.user.uid,
            registeredMeetup: [],
          };
          commit("setUser", user);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    clearError({ commit }) {
      console.log("asdasd");
      commit("clearError");
    },
  },
  modules: {},
});
