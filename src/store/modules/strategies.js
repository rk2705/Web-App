import axios from "axios";

export default {
  state: {
    strategies: [],
  },
  getters: {},
  mutations: {
    SET_STRATEGY(state, strategies) {
      state.strategies = strategies;
    },
  },
  actions: {
    fetchStrategies({ commit, rootState }) {
      axios
        .get(`/strategies/${rootState.user.current_account}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then((resp) => {
          commit("SET_STRATEGY", resp.data["strategies"]);
          console.log(resp.data["strategies"]);
        })
        .catch((err) => {
          let error = err.response.data.error;
          console.log(error);
        });
    },
  },
};
