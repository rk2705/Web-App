<template>
  <div id="queued">
    <div class="main-element-header">
      <h5 class="main-h5">Queued</h5>
      <h6>
        Total: <span id="total-queued">{{ queued.length }}</span>
      </h6>
    </div>

    <div class="border">
      <ol id="queued-list">
        <li v-for="(queue, index) in queued" :key="index"></li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "Queued",
  data() {
    return {
      queued: [],
    };
  },
  created() {
    // WATCHERS

    // queued
    this.$store.watch(
      (state) => {
        return state.dashboard.queued;
      },
      (newValue) => {
        this.queued = newValue;
      }
    );
  },
};
</script>

<style lang="scss">
#queued {
  & > div:nth-child(2) {
    overflow: auto;

    ol {
      padding: 0.5em 0 1em 2.5em;
      line-height: 1.5em;
      font-size: 0.8rem;
    }
  }
}
</style>
