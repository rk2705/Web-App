<template>
  <div id="footer">
    <div>
      <label
        >TRADER: <span>{{ user_name }}</span></label
      >
    </div>
    <div>
      <label class="clickable"
        >ACCOUNT ID: <span>{{ convertAccountID }}</span></label
      >
    </div>
    <div>
      <label class="clickable">STATUS: <span>Active</span></label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      user_name: null,
      current_account: null,
    };
  },
  created() {
    this.user_name = this.$store.getters.GET_USERNAME;
    this.current_account = this.$store.getters.GET_CURRENT_ACCOUNT;
  },
  computed: {
    convertAccountID: function() {
      let id = this.current_account;
      let converted = "";
      for (var i = 0; i < id.length; i++) {
        if (i < id.length - 4) converted += "*";
        else converted += id[i];
      }
      return converted;
    },
  },
  methods: {
    changeAccount() {
      let accounts = this.$store.state.user.accounts_ids;
      if (accounts.length > 1) {
        let next_index = accounts.indexOf(this.current_account) + 1;
        if (next_index > accounts.length - 1) next_index = 0;
        // this.$store.dispatch("updateAccountID", accounts[next_index]);
        // this.updateWithNewAccountData();
      }
    },
  },
};
</script>

<style lang="scss">
#footer {
  background-color: $third-dark;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em;

  display: flex;
  justify-content: space-around;

  .clickable {
    cursor: pointer;
  }

  label {
    color: $primary-text;
    letter-spacing: 1.5px;
    font-size: 0.75rem;

    span {
      color: $primary-green;
    }
  }
}
</style>
