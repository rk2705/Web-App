<template>
  <div id="best-performers">
    <div class="main-element-header">
      <h5 class="main-h5">Worst Performing Equities</h5>
    </div>

    <div class="table-container border">
      <table>
        <thead>
          <th>Symbol</th>
          <th>ROV To Date</th>
        </thead>
        <tbody>
          <tr v-for="(best, index) in worst_performing_equities" :key="index">
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
  name: "Worst_Performers",
  data() {
    return {
      worst_performing_equities: [],
    };
  },
  created() {
    // WATCHERS

    // worst_performing_equities
    this.$store.watch(
      (state) => {
        return state.dashboard.worst_performing_equities;
      },
      (newValue) => {
        this.worst_performing_equities = newValue;
      }
    );
  },
};
</script>

<style lang="scss"></style>
