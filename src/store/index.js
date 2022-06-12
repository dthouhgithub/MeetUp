import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Vue from "vue";
import Vuex from "vuex";

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
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 4,
      };
      commit("createMeetup", meetup);
    },
    signUpUser({ commit }, payload) {
      createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then((data) => {
          const newUser = {
            id: data.user.uid,
            registeredMeetup: [],
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signInUser({ commit }, payload) {
      signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then((data) => {
          const user = {
            id: data.user.uid,
            registeredMeetup: [],
          };
          commit("setUser", user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    user(state) {
      return state.user;
    },
  },
  modules: {},
});
