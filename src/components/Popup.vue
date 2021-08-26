<template>
  <div id="popup">
    <div id="popup-container">
      <button v-on:click="$emit('closePopup')">Exit</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
};
</script>

<style lang="scss">
#popup {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;

  #popup-container {
    background: $primary-dark;
    border-radius: 5px;
    min-width: 350px;
    // min-height: 350px;
    margin: auto;
    border: ridge 1px $primary-green;

    & > div {
      padding: 1em;
      margin-top: 1em;
    }

    button {
      padding: 0.25em 0.5em;
      font-size: 1rem;
      background: $primary-red;
      border: none;
      color: white;
      transition: 0.2s ease;
      margin: 0.5em;
      float: right;

      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
    }
  }
}
</style>
