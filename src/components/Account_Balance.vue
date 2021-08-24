<template>
  <div id="account-balance">
    <div class="main-element-header">
      <h5 class="main-h5">Account Balance</h5>
    </div>

    <div id="account-balance-chart" class="chart-container">
      <LineChart
        class="chart"
        :chart-data="daily_account_balance"
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
      daily_account_balance: {},
    };
  },
  methods: {
    createDummyData() {
      let data = {
        "08-10-21": 1021.45,
        "08-11-21": 1001.23,
        "08-12-21": 1116.36,
        "08-13-21": 1255.12,
        "08-14-21": 923.77,
        "08-15-21": 1001.1,
        "08-16-21": 1088.22,
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

    this.daily_account_balance = this.setLineCharts(data);
  },
};
</script>

<style lang="scss"></style>
