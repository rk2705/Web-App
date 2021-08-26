<template>
  <div id="dashboard">
    <Tiles />
    <div class="container">
      <Account_Balance />
      <Profit_Loss />
      <Open_Positions />
      <Strategies />
      <Queue />
      <Forbidden />
      <Best_Performers />
      <Worst_Performers />
    </div>
  </div>
</template>

<script>
import Tiles from "../components/Tiles.vue";
import Open_Positions from "../components/Open_Positions.vue";
import Strategies from "../components/Strategies.vue";
import Queue from "../components/Queue.vue";
import Forbidden from "../components/Forbidden.vue";
import Best_Performers from "../components/Best_Performers.vue";
import Worst_Performers from "../components/Worst_Performers.vue";
import Account_Balance from "../components/Account_Balance.vue";
import Profit_Loss from "../components/Profit_Loss.vue";

export default {
  name: "Dashboard",
  components: {
    Tiles,
    Open_Positions,
    Strategies,
    Queue,
    Forbidden,
    Best_Performers,
    Worst_Performers,
    Account_Balance,
    Profit_Loss,
  },
  mounted() {
    this.$store.dispatch("fetchAccountBalanceHistory");

    this.$store.dispatch("fetchProfitLossHistory");

    this.$store.dispatch("fetchQueued");

    this.$store.dispatch("fetchForbiddenSymbols");

    this.$store.dispatch("fetchBestPerformingEquities");

    this.$store.dispatch("fetchWorstPerformingEquities");

    this.$store.dispatch("fetchOpenPositions");

    this.$store.dispatch("fetchStrategies");

    // EVERY MINUTE
    setInterval(() => {
      this.$store.dispatch("fetchQueued");

      this.$store.dispatch("fetchBestPerformingEquities");

      this.$store.dispatch("fetchWorstPerformingEquities");

      this.$store.dispatch("fetchOpenPositions");

      this.$store.dispatch("fetchStrategies");
    }, 60000);

    // UPDATE CHARTS AT MIDNIGHT
    function onMidnight() {
      var now = new Date();
      var night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0,
        0,
        0 // ...at 00:00:00 hours
      );
      return night.getTime() - now.getTime();
    }

    setInterval(() => {
      this.$store.dispatch("fetchAccountBalanceHistory");

      this.$store.dispatch("fetchProfitLossHistory");
    }, onMidnight());
  },
};
</script>

<style lang="scss">
#dashboard {
  position: relative;
  margin: auto;
  overflow: auto;
  height: 100%;
  width: 100%;

  .border {
    border: solid 1px $primary-dark;
    margin-top: 1em;
    height: 80%;
  }

  table {
    width: 100%;
    text-align: center;
    margin-top: 1em;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;

    th {
      font-size: 0.9rem;
      border-bottom: solid 1px $primary-green;
      min-width: 50px;
      max-width: 75px;
    }

    tr:nth-child(even) {
      background-color: $primary-dark;
    }

    td {
      font-size: 0.8rem;
      padding: 0.4em 0;
    }
  }

  .container {
    padding: 2em;
    height: 100%;
    display: grid;
    gap: 2em;
    width: 100%;
    grid-auto-columns: 100%;

    @media (min-width: 1300px) {
      grid-template-areas:
        "account_balance account_balance profit_loss profit_loss"
        "strategies strategies open_positions open_positions"
        "queued forbidden best_performers worst_performers";

      grid-auto-rows: minmax(200px, 275px);

      grid-auto-columns: minmax(auto, 1fr);

      & > div:nth-child(1) {
        grid-area: account_balance;
      }

      & > div:nth-child(2) {
        grid-area: profit_loss;
      }

      & > div:nth-child(3) {
        grid-area: open_positions;
      }

      & > div:nth-child(4) {
        grid-area: strategies;
      }

      & > div:nth-child(5) {
        grid-area: queued;
      }

      & > div:nth-child(6) {
        grid-area: forbidden;
      }

      & > div:nth-child(7) {
        grid-area: best_performers;
      }

      & > div:nth-child(8) {
        grid-area: worst_performers;
      }
    }

    .main-element-header {
      display: flex;
      justify-content: space-between;

      .main-h5 {
        font-size: 1rem;
        text-decoration: underline;
        color: $primary-green;
      }
    }

    & > div {
      border: $primary-green ridge 1px;
      color: white;
      padding: 1em;
      background-color: rgba(0, 33, 43, 0.35);
    }
  }
}
</style>
