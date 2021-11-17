import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import axios from "axios";
import NProgress from "nprogress";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "*",
    redirect: { name: "Dashboard" },
  },
  {
    path: "/",
    redirect: { name: "Dashboard" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

const guard = function(to, from, next) {
  // check for valid auth token
  NProgress.start();
  axios
    .get(`/auth/checkAuthToken`, {
      headers: { "x-access-token": store.state.auth.access_token },
    })
    .then(() => {
      // Token is valid, so continue
      next();
      NProgress.done();
    })
    .catch(() => {
      // There was an error so redirect
      next({ name: "Login" });
      NProgress.done();
    });
};

router.beforeEach((to, from, next) => {
  document.title = to["name"] || "Web App Name"; // CHANGE THIS TO APP NAME

  if (to.name !== "Login" && from.name !== "Login") {
    guard(to, from, next);
  } else next();
});

export default router;
