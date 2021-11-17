<template>
  <div id="dashboard">
    <Table :tableData="strategies" :tableName="'Strategies'" />
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
  },
  created() {
    this.$store.watch(
      (state) => state.strategies.strategies,
      (newValue) => {
        this.filterStrategies(newValue);
      }
    );

    this.$store.dispatch("fetchStrategies");
  },
};
// [{'Account_ID': 232327602,
//   'Active': True,
//   'Asset_Type': 'EQUITY',
//   'Avg_ROI': 0,
//   'MDD': 0.0,
//   'Order_Type': 'STANDARD',
//   'Position_Size': 500,
//   'Position_Type': 'LONG',
//   'Profit_Loss': 0.0,
//   'SR': 0,
//   'Strategy': 'TESTSTRATEGY',
//   'WRP': 0}]
</script>

<style lang="scss">
#dashboard {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(2, 1fr);
}
</style>
