import axios from "axios";

export default {
  state: {
    positions: [],
  },
  getters: {
    GET_POSITIONS(state) {
      return state.positions;
    },
  },
  mutations: {
    SET_POSITIONS(state, positions) {
      state.positions = positions;
    },
  },
  actions: {
    fetchPositions({ commit, rootState }) {
      axios
        .get(
          `/positions/${rootState.user.current_account}?position_name=open_positions`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "x-access-token": rootState.auth.access_token,
            },
          }
        )
        .then((resp) => {
          commit("SET_POSITIONS", resp.data["positions"]);
        })
        .catch((err) => {
          let error = err.response.data.error;
          console.log(error);
        });
    },
  },
};
