import axios from "axios";
import router from "../../router/index";

export default {
  state: {
    token: localStorage.getItem("token") || null,
    error: "",
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    REMOVE_TOKEN(state) {
      state.token = null;
      localStorage.setItem("token", null);
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    login({ commit }, data) {
      axios
        .post(`/login`, data)
        .then((resp) => {
          commit("SET_TOKEN", resp.data["token"]);

          commit("SET_INITIAL_DATA", resp.data["data"], {
            root: true,
          });

          setTimeout(() => {
            if (resp.data["token"] !== null || resp.data["token"] !== "") {
              router.push({ name: "Dashboard" });
            }
          }, 500);
        })
        .catch((err) => {
          let error = err.response.data.error;

          commit("SET_ERROR", error);
        });
    },
    logout({ commit }) {
      commit("REMOVE_TOKEN");

      router.push({
        name: "Login",
        params: { success: "You have been logged out" },
      });
    },
  },
};
