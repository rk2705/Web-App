<template>
  <div id="app">
    <!-- <div id="nav"><router-link to="/">Home</router-link> |</div> -->
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
  font-weight: 700;
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
  background: #ffffff;
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #354053;
}

.positive {
  color: #7fbf3f;
}

.negative {
  color: #f50303;
}
</style>
