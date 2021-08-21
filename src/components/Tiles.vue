<template>
  <div id="tiles">
    <div class="tile">
      <h5>User: <span id="user" class="positive">Trey Thomas</span></h5>
    </div>
    <div class="tile">
      <h5>
        Account ID: <span id="account_id" class="positive">123456789</span>
      </h5>
    </div>
    <div class="tile">
      <h5>Status: <span id="status" class="positive">Active</span></h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tiles",
};
</script>

<style lang="scss">
#tiles {
  color: white;
  display: flex;
  justify-content: space-around;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  position: fixed;
  width: 100%;
  max-width: 1300px;

  .tile {
    background: #00212b;
    padding: 0.5em 0;
    width: 100%;
    text-align: center;
    transition: 0.2s ease;

    h5 {
      letter-spacing: 1px;
      font-size: 0.75rem;
    }

    &:nth-child(2),
    &:nth-child(3) {
      border-left: solid black 1px;
      cursor: pointer;
    }

    &:nth-child(2):hover,
    &:nth-child(3):hover {
      opacity: 0.75;
    }
  }
}
</style>
