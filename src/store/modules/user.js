export default {
  state: {
    user_name: localStorage.getItem("user_name") || null,
    account_ids: JSON.parse(localStorage.getItem("account_ids")) || [],
    current_account: localStorage.getItem("current_account") || null,
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user_name = user["Name"];
      state.account_ids = user["Account_Ids"];
      state.current_account = user["Account_Ids"][0];

      localStorage.setItem("user_name", user["Name"]);
      localStorage.setItem("account_ids", JSON.stringify(user["Account_Ids"]));
      localStorage.setItem("current_account", user["Account_Ids"][0]);
    },
  },
  actions: {},
};
