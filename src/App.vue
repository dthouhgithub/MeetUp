<template>
  <v-app class="text-md-body-1">
    <v-navigation-drawer v-model="drawer" absolute left temporary height="100%">
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            link
            v-for="(item, index) in menuItems"
            :key="index"
            route
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card class="mx-auto overflow-hidden rounded-0" width="100%">
      <!-- Tab left -->

      <v-app-bar color="red darken-2" dark prominent height="55px">
        <v-app-bar-nav-icon
          class="d-sm-flex d-md-none"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            My Title</router-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn
          text
          class="d-none d-md-flex"
          v-for="(item, index) in menuItems"
          :key="index"
          route
          :to="item.link"
          height="48px"
        >
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title class="ml-1">{{ item.title }}</v-list-item-title>
        </v-btn>
      </v-app-bar>
    </v-card>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    menuItems: [
      { icon: "mdi-account-multiple", title: "VIEW MEETUPS", link: "/meetups" },
      { icon: "mdi-map-marker", title: "Organize Meetup", link: "/meetup/new" },
      { icon: "mdi-account-circle", title: "Profile", link: "/profile" },
      { icon: "mdi-account-plus", title: "Sign Up", link: "/signup" },
      { icon: "mdi-lock-open-outline", title: "Sign In", link: "/signin" },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
