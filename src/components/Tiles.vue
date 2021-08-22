<template>
  <div id="tiles">
    <div class="tile">
      <h5 id="web-app-title" class="negative">Web App Title</h5>
    </div>
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: solid $dark-red 2px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
    border-bottom: solid $dark-red 2px;
  }

  position: sticky;
  width: 100%;
  top: 0;

  .tile {
    background: $primary-dark;
    padding: 0.5em 0;
    width: 100%;
    text-align: center;
    transition: 0.2s ease;

    h5 {
      letter-spacing: 1px;
      font-size: 0.75rem;
    }

    &:nth-child(2),
    &:nth-child(4) {
      border-left: solid $dark-red 2px;
    }

    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: solid $dark-red 2px;
    }

    @media (min-width: 720px) {
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        border-left: solid $dark-red 2px;
      }

      &:nth-child(1),
      &:nth-child(2) {
        border-bottom: none;
      }
    }

    &:nth-child(3):hover,
    &:nth-child(4):hover {
      opacity: 0.75;
      cursor: pointer;
    }
  }
}
</style>
