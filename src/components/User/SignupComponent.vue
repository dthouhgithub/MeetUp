<template>
  <v-container>
    <v-layout row>
      <v-col xs="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <form>
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
                    <v-btn type="submit">Sign Up</v-btn>
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
  },
  methods: {
    onSignup() {
      console.log({
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
    },
  },
};
</script>
