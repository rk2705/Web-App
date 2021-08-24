<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
  background-image: url("assets/img/red_abstract_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

::-webkit-scrollbar {
  background: rgba(255, 255, 255, 0.5);
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: $primary-dark;
}

.positive {
  color: $primary-green;
}

.negative {
  color: $primary-red;
}

.chart-container {
  position: relative;
  height: 250px;

}

.chart {
  height: 100%;
  z-index: 10;

  canvas {
    width: 100% !important;
    height: 100%;
  }
}
</style>
