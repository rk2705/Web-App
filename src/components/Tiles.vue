<template>
  <div id="tiles">
    <div class="tile">
      <h5 id="web-app-title" class="negative">Web App Title</h5>
    </div>
    <div class="tile">
      <h5>
        User: <span id="user" class="positive">{{ username }}</span>
      </h5>
    </div>
    <div class="tile" v-on:click="changeAccount">
      <h5>
        Account ID:
        <span id="account_id" class="positive">{{ convertAccountID }}</span>
      </h5>
    </div>
    <div class="tile">
      <h5>
        Account Balance:
        <span
          id="account_balance"
          :class="account_balance >= 0 ? 'positive' : 'negative'"
          >${{ account_balance }}</span
        >
      </h5>
    </div>
    <div class="tile">
      <h5>
        Rate of Return(30 days):
        <span
          id="rate-of-return"
          :class="rate_of_return >= 0 ? 'positive' : 'negative'"
          >{{ rate_of_return }}%</span
        >
      </h5>
    </div>
    <div class="tile">
      <h5>
        Number of Holdings:
        <span id="number-of-holdings" class="positive">{{
          number_of_holdings
        }}</span>
      </h5>
    </div>
    <div class="tile" v-on:click="changeAccountStatus">
      <h5>
        Status:
        <span
          id="status"
          :class="account_status === 'Active' ? 'positive' : 'negative'"
          >{{ account_status }}</span
        >
      </h5>
    </div>
    <div class="tile" v-on:click="$store.dispatch('logout')">
      <h5>
        Logout
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tiles",
  data() {
    return {
      account_id: "",
      account_balance: 0,
      username: "",
      account_status: "N/A",
      rate_of_return: 0,
      number_of_holdings: 0,
    };
  },
  computed: {
    convertAccountID: function() {
      let id = this.account_id;

      let converted = "";

      for (var i = 0; i < id.length; i++) {
        if (i < id.length - 4) converted += "*";
        else converted += id[i];
      }

      return converted;
    },
  },
  methods: {
    changeAccountStatus() {
      let new_status = "";

      if (this.account_status == "Active") new_status = "INACTIVE";
      else new_status = "ACTIVE";

      let result = confirm(
        `ALERT: Are You Sure You Want To Change Your Status To ${new_status} For Account ${this.convertAccountID}?`
      );

      if (result) {
        this.$store
          .dispatch("changeAccountStatus")
          .then((res) => {
            if (res.status == 201) {
              alert("Status Changed Successfully");
            } else {
              alert("Failed To Update Status");
            }
          })
          .catch(() => {
            alert("Failed To Update Status");
          });
      }
    },
    changeAccount() {
      let accounts = this.$store.state.account.accounts;

      if (accounts.length > 1) {
        let next_index = accounts.indexOf(this.account_id) + 1;

        if (next_index > accounts.length - 1) next_index = 0;

        this.$store.dispatch("updateAccountID", accounts[next_index]);

        this.updateWithNewAccountData();
      }
    },
    updateWithNewAccountData() {
      // FETCH BALANCE, ROR, NOH, STATUS
      this.$store.dispatch("fetchAccountStatus");

      this.$store.dispatch("fetchAccountBalance");

      this.$store.dispatch("fetchRateOfReturn");

      this.$store.dispatch("fetchNumberOfHoldings");

      this.$store.dispatch("fetchAccountBalanceHistory");

      this.$store.dispatch("fetchProfitLossHistory");

      this.$store.dispatch("fetchQueued");

      this.$store.dispatch("fetchForbiddenSymbols");

      this.$store.dispatch("fetchBestPerformingEquities");

      this.$store.dispatch("fetchWorstPerformingEquities");

      this.$store.dispatch("fetchOpenPositions");

      this.$store.dispatch("fetchStrategies");
    },
  },
  created() {
    this.account_id = this.$store.state.account.account_id;
    this.username = this.$store.state.account.username;

    // FETCH BALANCE, ROR, NOH, STATUS
    this.$store.dispatch("fetchAccountStatus");

    this.account_status = this.$store.state.account.account_status;

    this.$store.dispatch("fetchAccountBalance");

    this.account_balance = this.$store.state.account.account_balance;

    this.$store.dispatch("fetchRateOfReturn");

    this.rate_of_return = this.$store.state.account.rate_of_return;

    this.$store.dispatch("fetchNumberOfHoldings");

    this.number_of_holdings = this.$store.state.account.number_of_holdings;

    // EVERY MINUTE
    setInterval(() => {
      this.$store.dispatch("fetchAccountBalance");
    }, 5000);

    setInterval(() => {
      this.$store.dispatch("fetchRateOfReturn");
      this.$store.dispatch("fetchNumberOfHoldings");
    }, 60000);

    // WATCHERS

    // account_status
    this.$store.watch(
      (state) => {
        return state.account.account_status;
      },
      (newValue) => {
        this.account_status = newValue;
      }
    );

    // account_balance
    this.$store.watch(
      (state) => {
        return state.account.account_balance;
      },
      (newValue) => {
        this.account_balance = newValue;
      }
    );

    // account_id
    this.$store.watch(
      (state) => {
        return state.account.account_id;
      },
      (newValue) => {
        this.account_id = newValue;
      }
    );

    // rate_of_return
    this.$store.watch(
      (state) => {
        return state.account.rate_of_return;
      },
      (newValue) => {
        this.rate_of_return = newValue;
      }
    );

    // number_of_holdings
    this.$store.watch(
      (state) => {
        return state.account.number_of_holdings;
      },
      (newValue) => {
        this.number_of_holdings = newValue;
      }
    );
  },
};
</script>

<style lang="scss">
#tiles {
  color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(8, 1fr);
    border-bottom: solid 1px $primary-green;
  }

  position: sticky;
  width: 100%;
  top: 0;

  .tile {
    background: $primary-dark;
    padding: 0.5em 0;
    width: 100%;
    text-align: center;
    transition: 0.2s ease;

    h5 {
      letter-spacing: 1px;
      font-size: 0.75rem;
    }

    &:nth-child(3),
    &:nth-child(7),
    &:nth-child(8) {
      cursor: pointer;

      &:hover {
        opacity: 0.75;
      }
    }
  }
}
</style>
