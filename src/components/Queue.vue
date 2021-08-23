<template>
  <div id="queued">
    <div class="main-element-header">
      <h5 class="main-h5">Queued</h5>
      <h6>Total: <span id="total-queued">2</span></h6>
    </div>

    <div class="border">
      <ol id="queued-list">
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "Queued",
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
