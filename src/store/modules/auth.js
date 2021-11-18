import axios from "axios";
import router from "../../router/index";
import NProgress from "nprogress";

export default {
  state: {
    access_token: localStorage.getItem("access_token") || null,
    error: "",
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.access_token = token;
      localStorage.setItem("access_token", token);
    },
    REMOVE_TOKEN(state) {
      state.access_token = null;
      localStorage.setItem("access_token", null);
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    login({ commit, dispatch }, data) {
      NProgress.start();
      axios
        .post(`/auth/login`, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((resp) => {
          commit("SET_TOKEN", resp.data["access_token"]);

          commit("SET_USER", resp.data["user"], {
            root: true,
          });

          dispatch("fetchCurrentAccountStatus");

          setTimeout(() => {
            if (
              resp.data["access_token"] !== null ||
              resp.data["access_token"] !== ""
            ) {
              NProgress.done();
              router.push({ name: "Dashboard" });
            }
          }, 500);
        })
        .catch((err) => {
          let error = err.response.data.error;

          commit("SET_ERROR", error);

          NProgress.done();
        });
    },
    logout({ commit }) {
      NProgress.start();
      axios
        .get(`/auth/logout`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(() => {
          commit("REMOVE_TOKEN");

          NProgress.done();

          router.push({
            name: "Login",
            params: { success: "You have been logged out" },
          });
        })
        .catch((err) => {
          let error = err.response.data.error;

          commit("SET_ERROR", error);

          NProgress.done();
        });
    },
  },
};
