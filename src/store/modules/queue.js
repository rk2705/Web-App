import axios from "axios";

export default {
  state: {
    queue: [],
  },
  getters: {
    GET_QUEUE(state) {
      return state.queue;
    },
  },
  mutations: {
    SET_QUEUE(state, queue) {
      state.queue = queue;
    },
  },
  actions: {
    fetchQueue({ commit, rootState }) {
      axios
        .get(`/queue/${rootState.user.current_account}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then((resp) => {
          commit("SET_QUEUE", resp.data["queue"]);
        })
        .catch((err) => {
          let error = err.response.data.error;
          console.log(error);
        });
    },
  },
};
