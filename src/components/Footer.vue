<template>
  <div id="footer">
    <div>
      <label
        >TRADER: <span>{{ user_name }}</span></label
      >
    </div>
    <div>
      <label class="clickable" v-on:click="changeAccount"
        >ACCOUNT ID: <span>{{ convertAccountID }}</span></label
      >
    </div>
    <div>
      <label class="clickable" v-on:click="changeStatus"
        >STATUS:
        <span
          id="current_account_status"
          v-bind:class="[
            current_account_status === true ? 'positive' : 'negative',
          ]"
          >{{ current_account_status === true ? "Active" : "Inactive" }}</span
        ></label
      >
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
      current_account_status: null,
    };
  },
  created() {
    this.user_name = this.$store.getters.GET_USERNAME;
    this.current_account = this.$store.getters.GET_CURRENT_ACCOUNT;
    this.current_account_status = this.$store.getters.GET_CURRENT_ACCOUNT_STATUS;
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
      let accounts = this.$store.state.user.account_ids;

      if (accounts.length > 1) {
        let next_index = accounts.indexOf(this.current_account) + 1;
        if (next_index > accounts.length - 1) next_index = 0;

        this.$store.commit("SET_CURRENT_ACCOUNT", accounts[next_index]);

        this.current_account = accounts[next_index];

        this.$store.dispatch("fetchStrategies");

        this.$store.dispatch("fetchPositions");

        this.$store.dispatch("fetchQueue");

        this.$store.dispatch("fetchForbidden");
      } else return;
    },
    changeStatus() {
      if (
        confirm(
          `Are you sure you want to change account status to ${
            this.current_account_status === true ? "INACTIVE" : "ACTIVE"
          }?`
        )
      )
        this.$store.dispatch("changeCurrentAccountStatus");

      this.current_account_status = !this.current_account_status;
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

    span:not(#current_account_status) {
      color: $primary-green;
    }
  }
}
</style>
