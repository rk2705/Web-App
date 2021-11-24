import axios from "axios";

export default {
  state: {
    strategies: [],
  },
  getters: {
    GET_STRATEGIES(state) {
      return state.strategies;
    },
  },
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
        })
        .catch((err) => {
          let error = err.response.data.error;
          console.log(error);
        });
    },
    saveStrategy({ commit, rootState }, data) {
      axios
        .put(`/strategies/${rootState.user.current_account}`, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then(() => {
          let strategies = JSON.parse(
            JSON.stringify(rootState.strategies)
          ).strategies.map((strategy) => {
            if (strategy.Strategy === data.strategy) {
              strategy.Active = data.active;
              strategy.Asset_Type = data.asset_type;
              strategy.Order_Type = data.order_type;
              strategy.Position_Type = data.position_type;
              strategy.Position_Size = data.position_size;
            }

            return strategy;
          });

          commit("SET_STRATEGY", strategies);
        })
        .catch((err) => {
          let error = err.response.data.error;
          console.log(error);
        });
    },
  },
};
