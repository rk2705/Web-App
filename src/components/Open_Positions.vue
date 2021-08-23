<template>
  <div id="open-positions">
    <div class="main-element-header">
      <h5 class="main-h5">Open Positions</h5>
      <h6>Total: <span id="total-open-positions">7</span></h6>
    </div>

    <div id="inner-container" class="border">
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>10mOOO30mwowow</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
      <div class="bar">
        <h6>Strategy1</h6>
        <ol>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Open Positions",
};
</script>

<style lang="scss" scoped>
#open-positions {
  #inner-container {
    overflow: auto;

    display: flex;
    justify-content: space-between;

    padding: 0 0.5em;

    .bar {
      h6 {
        font-size: 0.9rem;
        border-bottom: solid 1px $primary-green;
        margin-left: 1em;
      }

      ol {
        font-size: 0.8rem;
        line-height: 1.5;
        margin-top: 0.5em;
        padding-left: 3em;
        padding-bottom: 0.5em;
      }
    }
  }
}
</style>
