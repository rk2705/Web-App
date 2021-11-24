<template>
  <div id="dashboard">
    <Table :tableData="strategies" :tableName="'Strategies'" />
    <Table :tableData="queue" :tableName="'Queued Orders'" />
    <Table :tableData="positions" :tableName="'Open Positions'" />
    <Table :tableData="forbidden" :tableName="'Forbidden Symbols'" />
  </div>
</template>

<script>
import Table from "../components/Table.vue";
export default {
  Name: "Dashboard",
  components: { Table },
  data() {
    return {
      strategies: [],
      positions: [],
      queue: [],
      forbidden: [],
    };
  },
  methods: {
    filterStrategies(strategies) {
      strategies.forEach((strategy) => {
        delete strategy.Account_ID;
        delete strategy.Asset_Type;
        delete strategy.Order_Type;
        delete strategy.Position_Type;

        strategy.Active = strategy.Active === true ? "True" : "False";
      });

      this.strategies = strategies;
    },

    filterPositions(positions) {
      positions.forEach((position) => {
        delete position._id;
        delete position.Position_Size;
        delete position.Trader;
        delete position.Position_Type;
        delete position.Data_Integrity;
        delete position.Account_ID;
        delete position.Entry_Price;

        position.Entry_Date = this.formatDate(position.Entry_Date);
      });

      this.positions = positions;
    },
    filterQueue(queued) {
      queued.forEach((queue) => {
        delete queue._id;
        delete queue.Direction;
        delete queue.Trader;
        delete queue.Order_ID;
        delete queue.Order_Status;
        delete queue.Account_ID;
        delete queue.Position_Size;
        delete queue.Position_Type;
        delete queue.Side;
        delete queue.Entry_Price;
        delete queue.Asset_Type;
        delete queue.Qty;
        delete queue.Order_Type;

        queue.Entry_Date = this.formatDate(queue.Entry_Date);
      });

      this.queue = queued;
    },

    filterForbidden(forbidden) {
      forbidden.forEach((forbidden) => {
        delete forbidden._id;
        delete forbidden.Account_ID;

        if (forbidden.Created.length !== 10)
          forbidden.Created = this.formatDate(forbidden.Created);
      });

      this.forbidden = forbidden;
    },

    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },

  created() {
    this.$store.watch(
      (state) => state.strategies.strategies,
      (newValue) => {
        this.filterStrategies(JSON.parse(JSON.stringify(newValue)));
      }
    );

    this.$store.watch(
      (state) => state.positions.positions,
      (newValue) => {
        this.filterPositions(JSON.parse(JSON.stringify(newValue)));
      }
    );

    this.$store.watch(
      (state) => state.queue.queue,
      (newValue) => {
        this.filterQueue(JSON.parse(JSON.stringify(newValue)));
      }
    );

    this.$store.watch(
      (state) => state.forbidden.forbidden,
      (newValue) => {
        this.filterForbidden(JSON.parse(JSON.stringify(newValue)));
      }
    );

    this.$store.dispatch("fetchStrategies");

    this.$store.dispatch("fetchPositions");

    this.$store.dispatch("fetchQueue");

    this.$store.dispatch("fetchForbidden");
  },
};
</script>

<style lang="scss">
#dashboard {
  display: grid;
  gap: 1em;
  overflow: auto;
  padding: 1em 1em 4em 1em;
  position: relative;
  height: 100vh;

  grid-auto-rows: minmax(200px, 275px);
  grid-auto-columns: minmax(auto, 1fr);

  grid-template-areas:
    "strategies strategies queue"
    "positions positions forbidden";

  @media (max-width: 1400px) {
    grid-template-areas:
      "strategies strategies"
      "positions positions"
      "queue forbidden";
  }

  & > div:nth-child(1) {
    grid-area: strategies;
  }

  & > div:nth-child(2) {
    grid-area: queue;
  }

  & > div:nth-child(3) {
    grid-area: positions;
  }

  & > div:nth-child(4) {
    grid-area: forbidden;
  }

  // FORBIDDEN SYMBOL
  .add-forbidden-form-container {
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(1, 1, 1, 0.85);
    }

    form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $primary-dark;
      padding: 1em;

      display: grid;
      gap: 2em;
      border: solid 2px $primary-text;

      button {
        width: fit-content;
        padding: 0.25em 1em;
        float: right;
        cursor: pointer;
        transition: 0.2s ease;
        background-color: $primary-red;
        color: $primary-text;
        border-radius: 2px;
        border: solid 1px transparent;

        &:hover {
          opacity: 0.85;
        }
      }

      input:not([type="submit"]) {
        padding: 0.5em;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid $primary-light;
      }

      input[type="submit"] {
        font-size: 1.1rem;
        letter-spacing: 1.5px;
        padding: 0.5em;
        background-color: $primary-dark;
        border-radius: 5px;
        border: 1px solid $primary-light;
        cursor: pointer;
        transition: 0.2s ease;
        color: $primary-light;

        &:hover {
          opacity: 0.85;
        }
      }
    }
  }

  // Table popup
  .table-popup-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.85);

    & > div {
      color: $primary-text;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      background-color: $primary-dark;
      padding: 1em;

      display: grid;
      gap: 0.5em;

      border: solid 2px $primary-light;

      .exit-popup {
        width: fit-content;
        padding: 0.25em 1em;
        float: right;
        cursor: pointer;
        transition: 0.2s ease;
        background-color: $primary-red;
        color: $primary-text;
        border-radius: 2px;
        border: solid 1px transparent;

        &:hover {
          opacity: 0.85;
        }
      }

      .danger-btn,
      .success-btn {
        width: fit-content;
        padding: 0.25em 1em;
        float: right;
        cursor: pointer;
        transition: 0.2s ease;
        border-radius: 2px;
        border: solid 1px transparent;

        &:hover {
          opacity: 0.85;
        }
      }

      .danger-btn {
        background-color: $primary-red;
        color: $primary-text;
      }

      .success-btn {
        background-color: $primary-light;
        color: $primary-dark;
      }

      & div {
        display: flex;
        justify-content: space-between;
        padding: 0.25em;

        input,
        select {
          padding: 0.25em;
        }
      }

      & > div:nth-child(even) {
        background-color: $third-dark;
      }
    }
  }
}
</style>
