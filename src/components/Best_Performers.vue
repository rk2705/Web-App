<template>
  <div id="best-performers">
    <div class="main-element-header">
      <h5 class="main-h5">Best Performing Equities</h5>
    </div>

    <div class="table-container border">
      <table>
        <thead>
          <th>Symbol</th>
          <th>ROV To Date</th>
        </thead>
        <tbody>
          <tr v-for="(best, index) in best_performing_equities" :key="index">
            <td>{{ best["Symbol"] }}</td>
            <td>{{ best["ROV"] }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Best_Performing_Equity",
  data() {
    return {
      best_performing_equities: [],
    };
  },
  created() {
    // WATCHERS

    // best_performing_equities
    this.$store.watch(
      (state) => {
        return state.dashboard.best_performing_equities;
      },
      (newValue) => {
        this.best_performing_equities = newValue;
      }
    );
  },
};
</script>

<style lang="scss"></style>
