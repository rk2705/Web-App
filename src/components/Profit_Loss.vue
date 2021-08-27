<template>
  <div id="profit-loss">
    <div class="main-element-header">
      <h5 class="main-h5">Profit Loss</h5>
    </div>

    <div id="profit-loss-chart" class="chart-container">
      <LineChart
        class="chart"
        :chart-data="profit_loss_history"
        chart_name=""
      />
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart";

export default {
  name: "Profit_Loss",
  components: {
    LineChart,
  },
  data() {
    return {
      profit_loss_history: {},
    };
  },
  methods: {
    setLineCharts(data) {
      let labels = [];
      let balances = [];

      data.forEach((row) => {
        labels.push(row["Date"]);
        balances.push(row["Profit_Loss"]);
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
    let data = this.$store.state.dashboard.profit_loss_history;

    this.profit_loss_history = this.setLineCharts(data);

    // account_balance_line_chart
    this.$store.watch(
      (state) => {
        return state.dashboard.profit_loss_history;
      },
      (newValue) => {
        this.profit_loss_history = this.setLineCharts(newValue);
      }
    );
  },
};
</script>

<style lang="scss"></style>
