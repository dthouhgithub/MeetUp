<template>
  <v-container>
    <v-layout row v-if="error">
      <v-col xs="12" sm="6" offset-sm="3">
        <alert-component
          @dismissed="onDismissed"
          :text="error.message"
        ></alert-component>
      </v-col>
    </v-layout>
    <v-layout row>
      <v-col xs="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
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
                    <v-text-field
                      name="confirmPassword"
                      label="ConfirmPassword"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col xs="12">
                    <v-btn
                      type="submit"
                      :disabled="loading"
                      :loading="loading"
                      color="info"
                      class="ma-2"
                      >Sign Up
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
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
  name: "SignupComponent",

  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Password do not match"
        : "";
    },
    user() {
      return this.$store.getters.getUser;
    },
    error() {
      return this.$store.getters.getError;
    },
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value != undefined) {
        console.log("yes");

        this.$router.push(`/`);
      }
    },
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUpUser", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>
<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
