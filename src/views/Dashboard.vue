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
      strategies: [
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
        {
          Strategy: "MyRSIStrategy",
          Avg_ROI: 2.36,
          SR: 1.44,
          MDD: 10.33,
          WRP: 72.78,
          Position_Size: 500,
          Status: "Active",
        },
      ],
    };
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
