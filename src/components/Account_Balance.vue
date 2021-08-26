<template>
  <div id="account-balance">
    <div class="main-element-header">
      <h5 class="main-h5">Account Balance</h5>
    </div>

    <div id="account-balance-chart" class="chart-container">
      <LineChart
        class="chart"
        :chart-data="account_balance_history"
        chart_name=""
      />
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart";

export default {
  name: "Account_Balance",
  components: {
    LineChart,
  },
  data() {
    return {
      account_balance_history: {},
    };
  },
  methods: {
    setLineCharts(data) {
      let labels = [];
      let balances = [];

      data.forEach((row) => {
        labels.push(row["Date"]);
        balances.push(row["Balance"]);
      });

      let line_color = "#7fbf3f";

      let datasets = [
        {
          label: "",
          data: balances,
          fill: false,
          backgroundColor: line_color,
          borderColor: line_color,
          pointRadius: 1,
          borderWidth: 2,
          spanGaps: true,
        },
      ];

      return {
        labels,
        datasets,
      };
    },
  },
  created() {
    let data = this.$store.state.dashboard.account_balance_history;

    this.account_balance_history = this.setLineCharts(data);

    // account_balance_line_chart
    this.$store.watch(
      (state) => {
        return state.dashboard.account_balance_history;
      },
      (newValue) => {
        this.account_balance_history = this.setLineCharts(newValue);
      }
    );
  },
};
</script>

<style lang="scss"></style>
