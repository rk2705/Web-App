<template>
  <div id="open-positions">
    <div>
      <h5 class="main-h5">Open Positions</h5>
      <h6>Total: <span id="total-open-positions">7</span></h6>
    </div>

    <div id="strategy-row">
      <span>Strategy1</span>
      <span>Strategy2</span>
      <span>Strategy3</span>
      <span>Strategy4</span>
      <span>Strategy5</span>
      <span>Strategy6</span>
    </div>
    <div id="strategy-list">
      <ol>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
      </ol>
      <ol>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
      </ol>
      <ol>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
      </ol>
      <ol>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
      </ol>
      <ol>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
      </ol>
      <ol>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
        <li>abcd</li>
      </ol>
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
    
  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
  }

  #strategy-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 0.5em 0 0 0;
    border-bottom: solid 1px $primary-green;

    span {
      font-size: 0.8rem;
      letter-spacing: 0.5px;
    }
  }

  #strategy-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 0.5em 0;

    ol {
      margin-left: 0.5em;
      line-height: 1.5;
      font-size: 0.8rem;
    }
  }
}
</style>
