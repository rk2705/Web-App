<template>
  <div id="dashboard">
    <Tiles />
  </div>
</template>

<script>
import Tiles from "../components/Tiles.vue";
export default {
  name: "Dashboard",
  components: { Tiles },
};
</script>

<style lang="scss">
#dashboard {
  max-width: 1300px;
  position: relative;
  margin: auto;
  height: 100vh;
  overflow: auto;

}
</style>
