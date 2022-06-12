import Vue from "vue";
import VueRouter from "vue-router";
import HomeComponent from "@/components/HomeComponent";
import CreateComponent from "@/components/Meetup/CreateComponent";
import MeetupsComponent from "@/components/Meetup/MeetupsComponent";
import MeetupComponent from "@/components/Meetup/MeetupComponent";
import ProfileComponent from "@/components/User/ProfileComponent";
import SigninComponent from "@/components/User/SigninComponent";
import SignupComponent from "@/components/User/SignupComponent";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeComponent",
    component: HomeComponent,
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: MeetupsComponent,
  },
  {
    path: "/meetups/:id",
    name: "Meetup",
    props: true,
    component: MeetupComponent,
  },
  {
    path: "/meetup/new",
    name: "Create",
    component: CreateComponent,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileComponent,
  },
  {
    path: "/signin",
    name: "Signin",
    component: SigninComponent,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
