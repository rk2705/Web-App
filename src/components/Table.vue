<template>
  <div class="table-container">
    <div class="table-header-div">
      <h5>
        {{ tableName }}
        <button
          class="add-forbidden-symbol"
          v-if="tableName === 'Forbidden Symbols'"
          v-on:click="addForbiddenSymbol"
        >
          +
        </button>
      </h5>
      <span>Total: {{ tableData.length }}</span>
    </div>
    <div class="table">
      <table>
        <thead>
          <th v-for="(title, index) in Headers" :key="index">
            {{ title.replace("_", " ") }}
          </th>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableData"
            :key="index"
            v-on:click="showPopup"
          >
            <td
              v-for="(value, key) in row"
              :key="key"
              v-bind:class="pairClass(value, key)"
            >
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="empty-message" v-if="tableData.length === 0">
      There Are No {{ tableName }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["tableData", "tableName"],
  data() {
    return {
      no_keys: ["Qty", "Position_Size"],
    };
  },
  computed: {
    Headers() {
      let table_th = [];
      try {
        Object.keys(this.tableData[0]).find((key) => {
          table_th.push(key);
        });
        return table_th;
      } catch {
        return table_th;
      }
    },
  },
  methods: {
    pairClass(value, key) {
      return {
        negative:
          (value < 0 &&
            typeof value === "number" &&
            !this.no_keys.includes(key)) ||
          (key === "Active" && value === "False"),
        positive:
          (value >= 0 &&
            typeof value === "number" &&
            !this.no_keys.includes(key)) ||
          (key === "Active" && value === "True"),
      };
    },
    addForbiddenSymbol(e) {
      if (!document.querySelector(".add-forbidden-form-container")) {
        let formElement = document.createElement("div");

        formElement.className = "add-forbidden-form-container";

        formElement.innerHTML = `
        <form action="#">
        <button id="exit-forbidden">Exit</button>
          <input type="text" name="symbol" placeholder="Enter Symbol"/>
          <input type="submit" value="Save" id="save-forbidden"/>
        </form>
      `;
        e.target.parentNode.parentNode.parentNode.appendChild(formElement);

        document
          .querySelector("#exit-forbidden")
          .addEventListener("click", this.exitForbiddenSymbolsForm);

        document
          .querySelector("#save-forbidden")
          .addEventListener("click", this.saveForbiddenSymbol);
      }
    },
    exitForbiddenSymbolsForm() {
      document.querySelector(".add-forbidden-form-container").remove();
    },
    saveForbiddenSymbol(e) {
      e.preventDefault();

      let Symbol = e.target.previousSibling.previousSibling.value.toUpperCase();

      // CHECK IF EMPTY FIELD
      if (Symbol === "") {
        alert("ERROR: Empty Field");
        return;
      }

      let dup = false;

      // CHECK IF SYMBOL ALREADY EXISTS
      this.$store.getters.GET_FORBIDDEN.forEach((obj) => {
        if (obj["Symbol"] === Symbol) {
          alert("ERROR: Symbol already forbidden");
          dup = true;
        }
      });

      if (dup) return;

      this.$store.dispatch("addForbidden", {
        Symbol,
      });

      this.exitForbiddenSymbolsForm();
    },
    formatDatetime(dt) {
      var m = new Date(dt);
      var dateString =
        m.getFullYear() +
        "/" +
        ("0" + (m.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getDate()).slice(-2) +
        " " +
        ("0" + m.getHours()).slice(-2) +
        ":" +
        ("0" + m.getMinutes()).slice(-2) +
        ":" +
        ("0" + m.getSeconds()).slice(-2);

      return dateString;
    },
    showPopup(e) {
      let obj;

      let extra = "";

      if (this.tableName == "Open Positions") {
        JSON.parse(JSON.stringify(this.$store.getters.GET_POSITIONS)).forEach(
          (position) => {
            if (
              position.Symbol ===
              e.target.parentNode.children[
                e.target.parentNode.children.length - 1
              ].innerHTML.trim()
            ) {
              position["Entry_Date"] = this.formatDatetime(
                position["Entry_Date"]
              );

              delete position["_id"];

              obj = position;

              // extra += `
              //   <button class="close-position">Close Position</button>
              // `;
              return;
            }
          }
        );
      } else if (this.tableName == "Strategies") {
        JSON.parse(JSON.stringify(this.$store.getters.GET_STRATEGIES)).forEach(
          (strategy) => {
            if (
              strategy.Strategy ===
              e.target.parentNode.children[
                e.target.parentNode.children.length - 2
              ].innerHTML.trim()
            ) {
              delete strategy["_id"];

              obj = strategy;

              extra += `
                <button class="save-strategy success-btn">Save</button>
              `;

              return;
            }
          }
        );
      } else if (this.tableName == "Queued Orders") {
        JSON.parse(JSON.stringify(this.$store.getters.GET_QUEUE)).forEach(
          (queue) => {
            if (
              queue.Symbol ===
              e.target.parentNode.children[
                e.target.parentNode.children.length - 1
              ].innerHTML.trim()
            ) {
              delete queue["_id"];

              obj = queue;

              // extra += `
              //   <button class="cancel-order">Cancel Order</button>
              // `;
              return;
            }
          }
        );
      } else if (this.tableName == "Forbidden Symbols") {
        JSON.parse(JSON.stringify(this.$store.getters.GET_FORBIDDEN)).forEach(
          (forbidden) => {
            if (
              forbidden.Symbol ===
              e.target.parentNode.children[
                e.target.parentNode.children.length - 1
              ].innerHTML.trim()
            ) {
              delete forbidden["_id"];

              obj = forbidden;

              extra += `
                <button class="remove-forbidden danger-btn">Remove Forbidden</button>
              `;
              return;
            }
          }
        );
      }

      let popup = document.createElement("div");

      popup.className = "table-popup-container";

      let html = "";

      let strategy_inputs = ["Position_Size"];

      let strategy_selects = [
        "Active",
        "Asset_Type",
        "Order_Type",
        "Position_Type",
      ];

      for (const key in obj) {
        if (this.tableName === "Strategies") {
          if (strategy_inputs.includes(key)) {
            html += `
            <div>
              <span>${key.replace(
                "_",
                " "
              )}: </span><input id="${key}-input" value="${obj[key]}"/>
            </div>
            `;
            continue;
          }

          if (strategy_selects.includes(key)) {
            let options = "";

            if (key === "Active") {
              options += `
                <option ${
                  obj[key] === true ? "selected" : ""
                } value="true">true</option>
                <option ${
                  obj[key] === false ? "selected" : ""
                }  value="false">false</option>
              `;
            }

            if (key === "Asset_Type") {
              options += `
                <option ${
                  obj[key] === "EQUITY" ? "selected" : ""
                } value="EQUITY">EQUITY</option>
                <option ${
                  obj[key] === "OPTION" ? "selected" : ""
                }  value="OPTION">OPTION</option>
              `;
            }

            if (key === "Order_Type") {
              options += `
                <option ${
                  obj[key] === "STANDARD" ? "selected" : ""
                } value="STANDARD">STANDARD</option>
                <option ${
                  obj[key] === "OCO" ? "selected" : ""
                }  value="OCO">OCO</option>
              `;
            }

            if (key === "Position_Type") {
              options += `
                <option ${
                  obj[key] === "LONG" ? "selected" : ""
                } value="LONG">LONG</option>
                <option ${
                  obj[key] === "SHORT" ? "selected" : ""
                }  value="SHORT">SHORT</option>
              `;
            }

            html += `
            <div>
              <span>${key.replace("_", " ")}: </span>
              <select id="${key}-select">
                ${options}
              </select>
            </div>
            `;
            continue;
          }
        }

        html += `
          <div>
            <span>${key.replace("_", " ")}: </span><span>${obj[key]}</span>
          </div>
        `;
      }

      popup.innerHTML = `<div><button class="exit-popup">Exit</button>${html}${extra}</div>`;

      document.querySelector("#dashboard").appendChild(popup);

      document
        .querySelector(".exit-popup")
        .addEventListener("click", this.closePopup);

      if (this.tableName === "Strategies")
        document
          .querySelector(".save-strategy")
          .addEventListener("click", this.saveStrategy);

      if (this.tableName === "Forbidden Symbols")
        document
          .querySelector(".remove-forbidden")
          .addEventListener("click", this.removeForbidden);
    },
    closePopup() {
      document.querySelector(".table-popup-container").remove();
    },
    saveStrategy(e) {
      let active =
        document.querySelector("#Active-select").value === "true"
          ? true
          : false;
      let asset_type = document.querySelector("#Asset_Type-select").value;
      let order_type = document.querySelector("#Order_Type-select").value;
      let position_type = document.querySelector("#Position_Type-select").value;
      let position_size = parseInt(
        document.querySelector("#Position_Size-input").value
      );
      let strategy = e.target.parentNode.children[11].children[1].innerHTML.trim();

      if (isNaN(position_size)) {
        alert("ERROR: Invalid Position Size");
        return;
      }

      let data = {
        strategy,
        active,
        asset_type,
        order_type,
        position_type,
        position_size,
      };

      console.log(data);

      this.$store.dispatch("saveStrategy", data);

      this.closePopup();
    },
    removeForbidden(e) {
      this.$store.dispatch(
        "removeForbidden",
        e.target.parentNode.children[3].children[1].innerHTML.trim()
      );

      this.closePopup();
    },
  },
};
</script>

<style lang="scss">
.table-container {
  color: $primary-text;
  background-color: $primary-dark;
  padding: 1em;
  border: solid 1px $primary-light;
  position: relative;

  .table-header-div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;

    h5 {
      font-size: 1rem;
      letter-spacing: 1.5px;
      font-style: italic;
      border-bottom: solid 1px $primary-light;

      button {
        padding: 0 0.25em;
        font-size: 1.5rem;
        background-color: transparent;
        color: $primary-text;
        border: solid 1px $primary-text;
        cursor: pointer;
        transition: 0.2s ease;

        &:hover {
          opacity: 0.5;
        }
      }
    }

    span {
      font-size: 0.75rem;
    }
  }

  .empty-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    letter-spacing: 1.5px;
    border-bottom: 1px solid $primary-light;
    width: fit-content;
  }

  .table {
    overflow-y: auto;
    min-height: 250px;
    max-height: 250px;

    & thead th {
      position: sticky;
      top: 0;
    }
  }

  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    width: 100%;

    tr {
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        opacity: 0.5;
      }
    }

    th {
      font-size: 0.9rem;
      border-bottom: solid 1px $primary-light;
      min-width: 50px;
      max-width: 75px;
      background-color: $third-light;
      padding: 0.5em 0;
    }
    tr:nth-child(even) {
      background-color: $third-dark;
    }
    td {
      font-size: 0.8rem;
      padding: 0.4em 0;
    }
  }
}
</style>
