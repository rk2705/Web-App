<template>
  <div id="profit-loss">
    <div class="main-element-header">
      <h5 class="main-h5">Profit Loss</h5>
    </div>

    <div id="profit-loss-chart" class="chart-container">
      <LineChart class="chart" :chart-data="daily_profit_loss" chart_name="" />
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
      daily_profit_loss: {},
    };
  },
  methods: {
    createDummyData() {
      let data = {
        "08-10-21": 23.44,
        "08-11-21": 55.22,
        "08-12-21": 33.57,
        "08-13-21": 10.24,
        "08-14-21": 16.74,
        "08-15-21": 67.45,
        "08-16-21": 47.11,
      };

      return data;
    },
    setLineCharts(data) {
      let labels = [];
      let balances = [];

      for (let key of Object.keys(data)) {
        labels.push(key);
        balances.push(data[key]);
      }

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
    let data = this.createDummyData();

    this.daily_profit_loss = this.setLineCharts(data);
  },
};
</script>

<style lang="scss"></style>
