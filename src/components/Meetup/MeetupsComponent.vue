<template>
  <v-container>
    <v-layout row wrap>
      <v-col xs="12" sm="10" md="8" offset-sm="1" offset-md="2">
        <v-card class="mb-5 info" v-for="meetup in meetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row>
              <v-col xs="5" sm="4" md="3">
                <v-img
                  style="cursor: pointer"
                  height="130px"
                  :src="meetup.imageUrl"
                ></v-img>
              </v-col>
              <v-col xs="7" sm="8" md="9">
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                    <div>{{ meetup.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn text route :to="`/meetups/${meetup.id}`" height="48px">
                    <v-icon color="blue-grey darken-3"
                      >mdi-arrow-top-right</v-icon
                    >
                    <v-list-item-title class="ml-1"
                      >VIEW MEETUP</v-list-item-title
                    >
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MeetupsComponent",

  data: () => ({}),
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
};
</script>
