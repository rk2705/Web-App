<template>
  <div id="app">
    <Sidebar v-if="$route.name !== 'Login'" />
    <div id="app-container">
      <router-view />
      <Footer v-if="$route.name !== 'Login'" />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: { Sidebar, Footer },
};
</script>

<style lang="scss">
@import url("https://use.typekit.net/ghr2zdi.css");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: myriad-pro, sans-serif;
  font-style: normal;
}

#app {
  width: 100%;
  height: 100vh;
  background-color: $secondary-dark;
  display: flex;
  overflow: auto;
}

#app-container {
  position: relative;
  width: 100%;
}

::-webkit-scrollbar {
  background: $third-dark;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: $primary-light;
}

.positive {
  color: $primary-green;
}

.negative {
  color: $primary-red;
}
</style>
