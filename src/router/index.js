import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import axios from "axios";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

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
];

const router = new VueRouter({
  routes,
  mode: "history",
});

const guard = function(to, from, next) {
  // check for valid auth token
  axios
    .get(`/checkAuthToken`, {
      headers: { "x-access-token": store.state.auth.token },
    })
    .then(() => {
      // Token is valid, so continue
      next();
    })
    .catch(() => {
      // There was an error so redirect
      next({ name: "Login" });
    });
};

router.beforeEach((to, from, next) => {
  document.title = to["name"] || "Web App Name"; // CHANGE THIS TO APP NAME

  if (to.name !== "Login") {
    guard(to, from, next);
  } else next();
});

export default router;
