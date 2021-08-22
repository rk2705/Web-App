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
      <h5>
        Account Balance:
        <span id="account_balance" class="positive">$20,145</span>
      </h5>
    </div>
    <div class="tile">
      <h5>
        Rate of Return(30 days):
        <span id="rate-of-return" class="positive">12.33%</span>
      </h5>
    </div>
    <div class="tile">
      <h5>
        Number of Holdings:
        <span id="number-of-holdings" class="positive">24</span>
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

  @media (min-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(7, 1fr);
    border-bottom: solid 1px $primary-green;
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

    &:nth-child(3),
    &:nth-child(7) {
      cursor: pointer;

      &:hover {
        opacity: 0.75;
      }
    }
  }
}
</style>
