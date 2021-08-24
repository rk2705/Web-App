import axios from "axios";

export default {
  state: {
    username: localStorage.getItem("username") || null,
    account_id: localStorage.getItem("account_id") || null,
    accounts: localStorage.getItem("accounts") || [],
    active: localStorage.getItem("active") || null,
    balance: localStorage.getItem("balance") || null,
  },
  getters: {},
  mutations: {
    // SET_ACCOUNT_DATA(state, account_data) {
    //   state.user = account_data["User"];

    //   state.active = account_data["Active"];

    //   state.accounts = account_data["Accounts"];

    //   state.balance = account_data["Balance"];

    // },
    // SET_ACTIVE_STATUS(state) {
    //   state.active = !state.active;
    // },
    SET_USER_DATA(state, user) {
      let accounts = user["Accounts"];
      // SET ACCOUNTS
      state.accounts = accounts;
      localStorage.setItem("accounts", accounts);

      // SET ACCOUNT ID
      state.account_id = Object.keys(accounts)[0];
      localStorage.setItem("account_id", Object.keys(accounts)[0]);

      // SET BALANCE
      state.balance =
        user["Accounts"][Object.keys(accounts)[0]]["Account_Balance"];
      localStorage.setItem(
        "balance",
        user["Accounts"][Object.keys(accounts)[0]]["Account_Balance"]
      );

      // SET ACTIVE STATUS
      let status = user["Active"];
      if (status) {
        state.active = "Active";
        localStorage.setItem("active", "Active");
      } else {
        state.active = "Inactive";
        localStorage.setItem("active", "Inactive");
      }

      // SET USER NAME
      state.username = user["Name"];
      localStorage.setItem("username", user["Name"]);
    },
  },
  actions: {
    getAccount({ commit, rootState }) {
      axios
        .get(`/api/account/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_ACCOUNT_DATA", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateAccountID({ commit }, account_id) {
      commit("SET_ACCOUNT_ID", account_id);
    },
    changeActiveStatus({ rootState, state, commit }) {
      axios
        .put(
          `/api/active_status`,
          { active: !state.active },
          {
            headers: { "x-access-token": rootState.auth.token },
          }
        )
        .then((res) => {
          commit("SET_ACTIVE_STATUS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
