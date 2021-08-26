import axios from "axios";

export default {
  state: {
    username: localStorage.getItem("username") || null,
    account_id: localStorage.getItem("account_id") || null,
    accounts: JSON.parse(localStorage.getItem("accounts")) || [],
    account_status: localStorage.getItem("account_status") || null,
    account_balance: localStorage.getItem("account_balance") || null,
    rate_of_return: localStorage.getItem("rate_of_return") || null,
    number_of_holdings: localStorage.getItem("number_of_holdings") || null,
  },
  getters: {},
  mutations: {
    SET_INITIAL_DATA(state, data) {
      let accounts = data["Account_IDs"];

      // SET ACCOUNTS
      state.accounts = accounts;
      console.log(accounts);
      localStorage.setItem("accounts", JSON.stringify(accounts));

      // SET ACCOUNT ID
      state.account_id = accounts[0];
      localStorage.setItem("account_id", accounts[0]);

      // SET USER NAME
      state.username = data["Username"];
      localStorage.setItem("username", data["Username"]);
    },
    SET_ACCOUNT_STATUS(state, status) {
      if (status) {
        state.account_status = "Active";
        localStorage.setItem("account_status", "Active");
      } else {
        state.account_status = "Inactive";
        localStorage.setItem("account_status", "Inactive");
      }
    },
    SET_ACCOUNT_BALANCE(state, balance) {
      state.account_balance = balance;
      localStorage.setItem("account_balance", balance);
    },
    SET_ACCOUNT_ID(state, account_id) {
      // SET ACCOUNT ID
      state.account_id = account_id;
      localStorage.setItem("account_id", account_id);
    },
    SET_RATE_OF_RETURN(state, rate_of_return) {
      state.rate_of_return = rate_of_return;
      localStorage.setItem("rate_of_return", rate_of_return);
    },
    SET_NUMBER_OF_HOLDINGS(state, number_of_holdings) {
      state.number_of_holdings = number_of_holdings;
      localStorage.setItem("number_of_holdings", number_of_holdings);
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

    //  CHANGE ACCOUNT STATUS
    changeAccountStatus({ rootState, state, commit }) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `/api/change_account_status/${rootState.account.account_id}`,
            { account_status: state.account_status },
            {
              headers: { "x-access-token": rootState.auth.token },
            }
          )
          .then((res) => {
            commit("SET_ACCOUNT_STATUS", res.data["account_status"]);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //  FETCH ACCOUNT STATUS
    fetchAccountStatus({ commit, rootState }) {
      axios
        .get(`/api/account_status/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_ACCOUNT_STATUS", res.data["account_status"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // FETCH ACCOUNT BALANCE
    fetchAccountBalance({ commit, rootState }) {
      axios
        .get(`/api/account_balance/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_ACCOUNT_BALANCE", res.data["account_balance"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // FETCH RATE OF RETURN
    fetchRateOfReturn({ commit, rootState }) {
      axios
        .get(`/api/rate_of_return/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_RATE_OF_RETURN", res.data["rate_of_return"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // FETCH NUMBER OF HOLDINGS
    fetchNumberOfHoldings({ commit, rootState }) {
      axios
        .get(`/api/number_of_holdings/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_NUMBER_OF_HOLDINGS", res.data["number_of_holdings"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
