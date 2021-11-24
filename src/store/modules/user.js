import axios from "axios";

export default {
  state: {
    user_name: localStorage.getItem("user_name") || null,
    account_ids: JSON.parse(localStorage.getItem("account_ids")) || [],
    current_account: localStorage.getItem("current_account") || null,
    current_account_status:
      JSON.parse(localStorage.getItem("current_account_status")) || null,
  },
  getters: {
    GET_USERNAME(state) {
      return state.user_name;
    },
    GET_CURRENT_ACCOUNT(state) {
      return state.current_account;
    },
    GET_CURRENT_ACCOUNT_STATUS(state) {
      return state.current_account_status;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user_name = user["Name"];
      state.account_ids = user["Account_Ids"];
      state.current_account = user["Account_Ids"][0];

      localStorage.setItem("user_name", user["Name"]);
      localStorage.setItem("account_ids", JSON.stringify(user["Account_Ids"]));
      localStorage.setItem("current_account", user["Account_Ids"][0]);
    },
    SET_CURRENT_ACCOUNT_STATUS(state, status) {
      state.current_account_status = status;
      localStorage.setItem("current_account_status", status);
    },
    SET_CURRENT_ACCOUNT(state, current_account) {
      state.current_account = current_account;
    },
  },
  actions: {
    fetchCurrentAccountStatus({ commit, rootState }) {
      axios
        .get(`/accounts/${rootState.user.current_account}/status`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then((resp) => {
          commit("SET_CURRENT_ACCOUNT_STATUS", resp.data["account_status"]);
        })
        .catch((err) => {
          let error = err.response.data.error;

          console.error(error);
        });
    },
    changeCurrentAccountStatus({ commit, rootState }) {
      axios
        .put(`/accounts/${rootState.user.current_account}/status`, null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": rootState.auth.access_token,
          },
        })
        .then(() => {
          commit(
            "SET_CURRENT_ACCOUNT_STATUS",
            !rootState.user.current_account_status
          );
        })
        .catch((err) => {
          let error = err.response.data.error;

          console.error(error);
        });
    },
  },
};
