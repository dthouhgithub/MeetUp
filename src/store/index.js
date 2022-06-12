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
    user: {
      id: 1,
      registeredMeetup: ["adsqwe2e321asdqw"],
    },
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
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
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
  },
  modules: {},
});
