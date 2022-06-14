import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";
import app from "./../firebaseInit.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "https://autopro8.mediacdn.vn/2021/11/16/supercar-blondie-bmw-i8-1-1637051107327669612828.jpg",
        id: 1,
        title: "Meetup loren",
        date: new Date(),
        description: "This is description",
        location: "Viet Nam",
      },
      {
        imageUrl:
          "https://autopro8.mediacdn.vn/2021/11/16/supercar-blondie-bmw-i8-1637050551587809995649.jpg",
        id: 2,
        title: "Meetup BMW",
        date: new Date(),
        description: "This is description",
        location: "Viet Nam",
      },
      {
        imageUrl:
          "https://autopro8.mediacdn.vn/2021/11/16/supercar-blondie-rolls-royce-wraith-black-badge-2-1637051688691320073799.jpg",
        id: 3,
        title: "Meetup Roll Royce",
        date: new Date(),
        description: "This is description",
        location: "Viet Nam",
      },
    ],
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
  },
  actions: {
    async createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
      };
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, "meetups"), meetup);
      console.log("Document written with ID: ", docRef.id);
      // db.collection("meetups")
      //   .add(meetup)
      //   .then((data) => {
      //     console.log(data);
      //     commit("createMeetup", meetup);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      commit("createMeetup", meetup);
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
