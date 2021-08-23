<template>
  <div id="forbidden">
    <div class="main-element-header">
      <h5 class="main-h5">
        Forbidden
        <button id="add-forbidden-button" title="Add Forbidden Symbol">
          +
        </button>
      </h5>
      <h6>Total: <span id="total-forbidden">3</span></h6>
    </div>

    <div class="table-container border">
      <table>
        <thead>
          <th>Symbol</th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td>ABC</td>
            <td><button class="delete-forbidden-button">Delete</button></td>
          </tr>
          <tr>
            <td>ABC</td>
            <td><button class="delete-forbidden-button">Delete</button></td>
          </tr>
          <tr>
            <td>ABC</td>
            <td><button class="delete-forbidden-button">Delete</button></td>
          </tr>
          <tr>
            <td>ABC</td>
            <td><button class="delete-forbidden-button">Delete</button></td>
          </tr>
          <tr>
            <td>ABC</td>
            <td><button class="delete-forbidden-button">Delete</button></td>
          </tr>
          <tr>
            <td>ABC</td>
            <td><button class="delete-forbidden-button">Delete</button></td>
          </tr>
          <tr>
            <td>ABC</td>
            <td><button class="delete-forbidden-button">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="add-forbidden-popup">
      <button id="exit-forbidden-popup" title="Exit">X</button>
      <div>
        <input
          type="text"
          id="forbidden-symbol-name"
          placeholder="Enter Symbol"
        />
        <input type="submit" value="Save" id="save-forbidden-symbol" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forbidden",
};
</script>

<style lang="scss">
#forbidden {
  position: relative;

  button,
  input[type="submit"] {
    transition: 0.2s ease;
    color: white;
    border: none;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }

  #add-forbidden-popup {
    padding: 1em;

    & > div {
      display: grid;
      gap: 1em;
    }

    input {
      height: 30px;
    }

    input[type="text"] {
      padding: 0.25em 0.5em;
      margin-top: 0.5em;
    }

    input[type="submit"] {
      color: black !important;
    }

    #exit-forbidden-popup {
        padding: 0.25em 0.5em;
        background-color: $primary-red;
        margin-left: 94%;
    }
  }

  .table-container {
    display: none;
  }
}

.delete-forbidden-button {
  padding: 0.5em 0.5em;
  background-color: $primary-red;
}

#add-forbidden-button {
  background-color: $primary-dark;
  border: none;
  color: white;
  padding: 0.25em 0.5em;
  margin-left: 0.5em;
  border: solid 1px white !important;
}
</style>
