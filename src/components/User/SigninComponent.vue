<template>
  <v-container>
    <v-layout row>
      <v-col xs="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-col xs="12">
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col xs="12">
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col xs="12">
                    <v-btn type="submit">Sign In</v-btn>
                  </v-col>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SigninComponent",

  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value != undefined) {
        this.$router.push(`/`);
      }
    },
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signInUser", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
