<template>
  <div id="dashboard">
    <Tiles />
    <div class="container">
      <Open_Positions />
      <div>closed positions</div>
      <div>strategies</div>
      <div>net_strategies</div>
      <div>net_stock</div>
      <div>forbidden</div>
    </div>
  </div>
</template>

<script>
import Tiles from "../components/Tiles.vue";
import Open_Positions from "../components/Open_Positions.vue";
export default {
  name: "Dashboard",
  components: { Tiles, Open_Positions },
};
</script>

<style lang="scss">
#dashboard {
  position: relative;
  margin: auto;
  // height: 100vh;
  overflow: auto;

  .container {
    padding: 1em;
    height: 100%;
    display: grid;
    gap: 1em;
    grid-template-areas:
      "open_positions closed_positions strategies"
      "net_strategies closed_positions strategies"
      "net_strategies net_stock forbidden";

    .main-h5 {
      font-size: 1rem;
      text-decoration: underline;
      color: $primary-green;
    }

    & > div {
      border: $primary-green ridge 1px;
      color: white;
      padding: 1em;
      background-color: rgba(0, 33, 43, 0.35);
    }

    & > div:nth-child(1) {
      grid-area: open_positions;
    }

    & > div:nth-child(2) {
      grid-area: closed_positions;
    }

    & > div:nth-child(3) {
      grid-area: strategies;
    }

    & > div:nth-child(4) {
      grid-area: net_strategies;
    }

    & > div:nth-child(5) {
      grid-area: net_stock;
    }

    & > div:nth-child(6) {
      grid-area: forbidden;
    }
  }
}
</style>
