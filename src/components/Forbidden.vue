<template>
  <div id="forbidden">
    <div class="main-element-header">
      <h5 class="main-h5">
        Forbidden Symbols
        <button
          id="add-forbidden-button"
          title="Add Forbidden Symbol"
          v-on:click="openPopup"
        >
          +
        </button>
      </h5>
      <h6>
        Total: <span id="total-forbidden">{{ forbidden_symbols.length }}</span>
      </h6>
    </div>

    <div class="table-container border">
      <table>
        <thead>
          <th>Symbol</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="(symbol, index) in forbidden_symbols" :key="index">
            <td>{{ symbol }}</td>
            <td>
              <button
                class="delete-forbidden-button"
                v-on:click="deleteForbiddenSymbol"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Popup v-if="popup" @closePopup="closePopup">
      <div id="add-forbidden-symbol">
        <h6>Add Forbidden Symbol</h6>
        <div>
          <input type="text" v-model="forbidden_symbol" />
          <input type="submit" value="Save" v-on:click="saveData" />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from "./Popup.vue"

export default {
  name: "Forbidden",
  components: { Popup },
  data() {
    return {
      forbidden_symbols: [],
      popup: false,
      forbidden_symbol: "",
    };
  },
  methods: {
    closePopup() {
      this.popup = false;
    },
    openPopup() {
      this.popup = true;
    },
    saveData() {
      let symbol = this.forbidden_symbol;

      if (symbol != "") {
        this.$store
          .dispatch("addForbiddenSymbol", symbol)
          .then((res) => {
            if (res.status == 201) {
              this.forbidden_symbol = "";

              const copied_symbols = [...this.forbidden_symbols]
              
              copied_symbols.push(symbol.toUpperCase());

              this.forbidden_symbols = copied_symbols;

              this.popup = false;

              alert(`${symbol.toUpperCase()} Added To Forbidden Symbols List.`);
            } else {
              alert("Error: Failed To Add Symbol");
            }
          })
          .catch(() => alert("Error: Failed To Add Symbol"));
      } else {
        alert("Symbol Field Can Not Be Empty");
      }
    },
    deleteForbiddenSymbol(event) {
      let parent = event.target.parentElement.parentElement;

      let symbol = parent.querySelector("td:nth-child(1)").textContent;

      let result = confirm(
        `ALERT: Are You Sure You Want To Remove ${symbol} from forbidden symbols list?`
      );

      if (result) {
        this.$store
          .dispatch("removeForbiddenSymbol", symbol)
          .then((res) => {
            if (res.status == 201) {
              this.forbidden_symbols = this.forbidden_symbols.filter(
                (item) => item !== symbol
              );

              alert(`${symbol} Removed From Forbidden Symbols List.`);
            } else {
              alert("Error: Failed To Remove Symbol");
            }
          })
          .catch(() => {
            alert("Error: Failed To Remove Symbol");
          });
      }
    },
  },
  created() {
    // WATCHERS

    // open_positions
    this.$store.watch(
      (state) => {
        return state.dashboard.forbidden_symbols;
      },
      (newValue) => {
        this.forbidden_symbols = newValue;
      }
    );
  },
};
</script>

<style lang="scss">
#forbidden {
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

  .table-container {
    td {
      padding: 0 !important;
    }
  }
}

#add-forbidden-symbol {
  & > div {
    display: grid;
    gap: 1em;
  }

  h6 {
    font-size: 1rem;
  }

  input {
    color: black !important;
    font-size: 1rem;
    padding: 0.25em;
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
