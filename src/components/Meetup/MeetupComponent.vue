<template>
  <v-container>
    <v-layout row wrap>
      <v-col xs="12">
        <v-card>
          <v-card-title>
            <h6 class="red--text">{{ meetup.title }}</h6>
          </v-card-title>
          <v-img
            style="cursor: pointer"
            height="400px"
            :src="meetup.imageUrl"
          ></v-img>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | date }} - {{ meetup.location }}
            </div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" class="rounded-0"> Register </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MeetupComponent",
  props: ["id"],
  data: () => ({}),
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
  },
};
</script>
