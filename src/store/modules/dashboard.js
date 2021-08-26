import axios from "axios";

export default {
  state: {
    account_balance_history: [],
    profit_loss_history: [],
    strategies: [],
    open_positions: [],
    queued: [],
    forbidden_symbols: [],
    best_performing_equities: [],
    worst_performing_equities: [],
  },
  getters: {},
  mutations: {
    SET_ACCOUNT_BALANCE_HISTORY(state, account_balance_history) {
      state.account_balance_history = account_balance_history;
    },
    SET_PROFIT_LOSS_HISTORY(state, profit_loss_history) {
      state.profit_loss_history = profit_loss_history;
    },
    SET_STRATEGIES(state, strategies) {
      state.strategies = strategies;
    },
    SET_OPEN_POSITIONS(state, open_positions) {
      state.open_positions = open_positions;
    },
    SET_QUEUED(state, queued) {
      state.queued = queued;
    },
    SET_FORBIDDEN_SYMBOLS(state, forbidden_symbols) {
      state.forbidden_symbols = forbidden_symbols;
    },
    SET_BEST_PERFORMING_EQUITIES(state, best_performing_equities) {
      state.best_performing_equities = best_performing_equities;
    },
    SET_WORST_PERFORMING_EQUITIES(state, worst_performing_equities) {
      state.worst_performing_equities = worst_performing_equities;
    },
  },
  actions: {
    fetchAccountBalanceHistory({ commit, rootState }) {
      axios
        .get(`/api/account_balance_history/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit(
            "SET_ACCOUNT_BALANCE_HISTORY",
            res.data["account_balance_history"]
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchProfitLossHistory({ commit, rootState }) {
      axios
        .get(`/api/profit_loss_history/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_PROFIT_LOSS_HISTORY", res.data["profit_loss_history"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchQueued({ commit, rootState }) {
      axios
        .get(`/api/queued/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_QUEUED", res.data["queued"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchForbiddenSymbols({ commit, rootState }) {
      axios
        .get(`/api/forbidden_symbols/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_FORBIDDEN_SYMBOLS", res.data["forbidden_symbols"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchBestPerformingEquities({ commit, rootState }) {
      axios
        .get(`/api/best_performing_equities/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit(
            "SET_BEST_PERFORMING_EQUITIES",
            res.data["best_performing_equities"]
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchWorstPerformingEquities({ commit, rootState }) {
      axios
        .get(`/api/worst_performing_equities/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit(
            "SET_WORST_PERFORMING_EQUITIES",
            res.data["worst_performing_equities"]
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchStrategies({ commit, rootState }) {
      axios
        .get(`/api/strategies/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_STRATEGIES", res.data["strategies"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchOpenPositions({ commit, rootState }) {
      axios
        .get(`/api/open_positions/${rootState.account.account_id}`, {
          headers: { "x-access-token": rootState.auth.token },
        })
        .then((res) => {
          commit("SET_OPEN_POSITIONS", res.data["open_positions"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addForbiddenSymbol({ rootState }, symbol) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `/api/add_forbidden_symbol/${rootState.account.account_id}`,
            { symbol },
            {
              headers: { "x-access-token": rootState.auth.token },
            }
          )
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    removeForbiddenSymbol({ rootState }, symbol) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `/api/remove_forbidden_symbol/${rootState.account.account_id}/${symbol}`,
            {
              headers: { "x-access-token": rootState.auth.token },
            }
          )
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateStrategy({ rootState }, data) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `/api/update_strategy/${rootState.account.account_id}`,
            { data },
            {
              headers: { "x-access-token": rootState.auth.token },
            }
          )
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
