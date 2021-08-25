<template>
  <div id="open-positions">
    <div class="main-element-header">
      <h5 class="main-h5">Open Positions</h5>
      <h6>
        Total:
        <span id="total-open-positions">{{ number_of_positions }}</span>
      </h6>
    </div>

    <div id="inner-container" class="border">
      <div class="bar" v-for="(position, index) in open_positions" :key="index">
        <h6>{{ position["Strategy"] }}</h6>
        <ol>
          <li v-for="(symbol, index) in position['Symbols']" :key="index">
            {{ symbol }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Open_Positions",
  data() {
    return {
      open_positions: [],
    };
  },
  computed: {
    number_of_positions() {
      let i = 0;

      this.open_positions.forEach((row) => {
        i += row["Symbols"].length;
      });

      return i;
    },
  },
  created() {
    // WATCHERS

    // open_positions
    this.$store.watch(
      (state) => {
        return state.dashboard.open_positions;
      },
      (newValue) => {
        this.open_positions = newValue;
      }
    );
  },
};
</script>

<style lang="scss" scoped>
#open-positions {
  #inner-container {
    overflow: auto;

    display: flex;
    // justify-content: space-between;

    padding: 0 0.5em;

    .bar {
      &:not(:nth-child(1)) {
        margin-left: 1em;
      }

      h6 {
        font-size: 0.9rem;
        border-bottom: solid 1px $primary-green;
        margin-left: 1em;
      }

      ol {
        font-size: 0.8rem;
        line-height: 1.5;
        margin-top: 0.5em;
        padding-left: 2em;
        padding-bottom: 0.5em;
      }
    }
  }
}
</style>
