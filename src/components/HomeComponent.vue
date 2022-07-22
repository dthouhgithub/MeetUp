<template>
  <v-container>
    <v-layout row wrap>
      <v-col xs="12" sm="6" class="text-right">
        <v-btn
          class="rounded-0"
          large
          route
          to="/meetups"
          color="deep-purple lighten-2"
          style="color: white"
          >Explore Meetups</v-btn
        >
      </v-col>
      <v-col xs="12" sm="6">
        <v-btn
          class="rounded-0"
          large
          route
          to="/meetup/new"
          color="deep-purple lighten-2"
          style="color: white"
          >Organize Meetup</v-btn
        >
      </v-col>
    </v-layout>
    <v-layout class="mt-2" row wrap>
      <v-col xs="12">
        <v-carousel>
          <v-carousel-item
            style="cursor: pointer"
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-layout>
    <v-layout class="mt-2" row wrap>
      <v-col cols="12" xs="12" class="text-center">
        <p>Join our awesome meetups!</p>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomeComponent",

  data: () => ({}),
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
  },
  mounted() {
    this.scrollToHash()
    this.$root.$on('scrollToElement', () => {
      setTimeout(() => {
        this.scrollToHash()
      }, 50)
    })
  },
  methods: {
    scrollToHash() {
      if (this.$route.hash) {
        const sectionName = this.$route.hash.replace('#', '')
        const sectionElement = this.$refs[sectionName]
        if (sectionElement) {
          let top =
            document.documentElement.scrollTop +
            sectionElement.getBoundingClientRect().top -
            (window.innerWidth > 768 ? 116 : 57)
          if (sectionName === 'news') top -= window.innerWidth > 768 ? 150 : 75
          window.scrollTo({
            top,
            left: 0,
            behavior: 'smooth',
          })
        }
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
        })
      }
    },
    onLoadMeetup(id) {
      this.$router.push(`/meetups/${id}`);
    },
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
