<template>
  <div id="dashboard">
    <Table :tableData="strategies" :tableName="'Strategies'" />
    <Table :tableData="positions" :tableName="'Open Positions'" />
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

        position.Entry_Date = this.formatDate(position.Entry_Date);
      });

      this.positions = positions;
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
        this.filterStrategies(newValue);
      }
    );

    this.$store.watch(
      (state) => state.positions.positions,
      (newValue) => {
        this.filterPositions(newValue);
      }
    );

    this.$store.dispatch("fetchStrategies");

    this.$store.dispatch("fetchPositions");
  },
};
</script>

<style lang="scss">
#dashboard {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(2, 1fr);
}
</style>
