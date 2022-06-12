<template>
  <v-container>
    <v-layout row>
      <v-col xs="12" sm="6" offset-sm="3">
        <h2 class="red--text">Create a new Meetup</h2>
      </v-col>
    </v-layout>
    <v-layout row>
      <v-col xs="12">
        <form @submit.prevent="onCreateMeetup" action="">
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-text-field
                v-model="title"
                color="red"
                name="title"
                label="Title"
                id="title"
              ></v-text-field>
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-text-field
                v-model="location"
                color="red"
                label="Location"
                name="location"
                id="location"
              ></v-text-field>
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-text-field
                v-model="imageUrl"
                color="red"
                label="Image URL"
                name="image-url"
                id="imageUrl"
              ></v-text-field>
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <img :src="imageUrl" />
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-textarea
                v-model="description"
                color="red"
                label="Description"
                name="description"
                id="description"
              ></v-textarea>
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <h4>Choose a Date & Time</h4>
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-date-picker v-model="date"></v-date-picker>
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-col>
          </v-layout>
          <v-layout row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-btn :disabled="!formIsValid" color="error" type="submit"
                >Create Meetup</v-btn
              >
            </v-col>
          </v-layout>
        </form>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CreateComponent",

  data: () => ({
    imageUrl: "",
    location: "",
    title: "",
    description: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    time: new Date(),
  }),
  computed: {
    formIsValid() {
      return (
        (this.title !== "") &
        (this.location !== "") &
        (this.imageUrl !== "") &
        (this.description !== "")
      );
    },
    submitableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        let minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      console.log(date);
      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date(),
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push(`/meetups`);
    },
  },
};
</script>
