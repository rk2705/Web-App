<template>
  <div id="sidebar">
    <div id="logo">My Webapp</div>
    <div id="nav-link-container">
      <div
        class="nav"
        v-bind:class="[$route.name === 'Dashboard' ? 'selected_route' : '']"
      >
        <span>DASHBOARD</span>
      </div>
      <div class="nav"><span>SETTINGS</span></div>
      <div class="nav" v-on:click="logout"><span>LOGOUT</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss">
#sidebar {
  background-color: $primary-dark;
  width: fit-content;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  color: $primary-text;

  #logo {
    text-align: center;
    padding: 1em;
  }

  #nav-link-container {
    .nav {
      width: 250px;
      padding: 1em 0.65em;
      border-bottom: $fourth-light solid 1px;
      letter-spacing: 1.5px;
      font-size: 0.9rem;
      transition: 0.2s ease-in-out;
      cursor: pointer;

      &:hover:not(.selected_route) {
        opacity: 0.85;
        padding-left: 1em;
        color: $primary-light;
      }
    }

    .nav:nth-child(1) {
      border-top: $fourth-light solid 1px;
    }

    .selected_route {
      opacity: 0.85;
      padding-left: 2em;
      color: $primary-light;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        width: 5px;
        height: 100%;
        top: 0;
        right: 0;
        background-color: $secondary-light;
      }
    }
  }
}
</style>
