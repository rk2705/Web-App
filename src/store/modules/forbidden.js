import axios from "axios";

export default {
  state: {
    forbidden: [],
  },
  getters: {
    GET_FORBIDDEN(state) {
      return state.forbidden;
    },
  },
  mutations: {
    SET_FORBIDDEN(state, forbidden) {
      state.forbidden = forbidden;
    },
  },
  actions: {
    fetchForbidden({ commit, rootState }) {
      axios
        .get(`/forbidden/${rootState.user.current_account}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then((resp) => {
          commit("SET_FORBIDDEN", resp.data["forbidden"]);
        })
        .catch((err) => {
          let error = err.response.data.error;
          console.log(error);
        });
    },
    addForbidden({ rootState }, data) {
      axios
        .post(`/forbidden/${rootState.user.current_account}`, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then((resp) => {
          rootState.forbidden.forbidden.push(resp.data["forbidden"]);
        })
        .catch((err) => {
          let error = err.response.data.error;
          console.log(error);
        });
    },
    removeForbidden({ commit, rootState }, symbol) {
      axios
        .delete(`/forbidden/${rootState.user.current_account}/${symbol}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then(() => {
          let forbidden = JSON.parse(
            JSON.stringify(rootState.forbidden)
          ).forbidden.filter((forbidden) => {
            return forbidden["Symbol"] !== symbol;
          });
          commit("SET_FORBIDDEN", forbidden);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
