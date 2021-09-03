<template>
  <div id="strategies">
    <div class="main-element-header">
      <h5 class="main-h5">Strategies</h5>
      <h6>
        Total: <span id="total-strategies">{{ strategies.length }}</span>
      </h6>
    </div>

    <div class="table-container border">
      <table>
        <thead>
          <th>Name</th>
          <th>Avg ROV</th>
          <th>PnL</th>
          <th>WRP</th>
          <th>MDD</th>
          <th>SR</th>
          <th>Position Size</th>
          <th>Status</th>
        </thead>
        <tbody>
          <tr v-for="(strategy, index) in strategies" :key="index">
            <td>{{ strategy["Strategy"] }}</td>
            <td :class="strategy['Avg_ROV'] >= 0 ? 'positive' : 'negative'">
              {{ strategy["Avg_ROV"] }}%
            </td>
            <td :class="strategy['Profit_Loss'] >= 0 ? 'positive' : 'negative'">
              ${{ strategy["Profit_Loss"] }}
            </td>
            <td :class="strategy['WRP'] >= 0 ? 'positive' : 'negative'">
              {{ strategy["WRP"] }}%
            </td>
            <td :class="strategy['MDD'] >= 0 ? 'positive' : 'negative'">
              ${{ strategy["MDD"] }}
            </td>
            <td :class="strategy['SR'] >= 0 ? 'positive' : 'negative'">
              {{ strategy["SR"] }}
            </td>
            <td class="cursor" v-on:click="openPopup">
              ${{ strategy["Position_Size"] }}
            </td>
            <td
              class="cursor"
              :class="strategy['Active'] === 'Active' ? 'positive' : 'negative'"
              v-on:click="openPopup"
            >
              {{ strategy["Active"] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Popup v-if="popup" @closePopup="closePopup">
      <div id="edit-strategy">
        <h6>{{ edit_data["Strategy"] }}</h6>
        <div>
          <label for="">Position Size ($)</label>
          <input
            type="text"
            placeholder="Position Size"
            v-model.number="edit_data['Position_Size']"
          />
        </div>
        <div>
          <label for="">Status</label>
          <select v-model="edit_data['Status']">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <input type="submit" value="Save" v-on:click="saveData" />
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from "./Popup.vue";

export default {
  name: "Strategies",
  components: { Popup },
  data() {
    return {
      strategies: [],
      popup: false,
      edit_data: {},
    };
  },
  methods: {
    closePopup() {
      this.popup = false;
    },
    openPopup(event) {
      this.popup = true;
      let parent = event.target.parentElement;

      let Strategy = parent
        .querySelector("td:nth-child(1)")
        .textContent.toString();

      let Position_Size = parseInt(parent.querySelector("td:nth-child(7)").textContent.replace("$", "").trim())

      let Status = parent
        .querySelector("td:nth-child(8)")
        .textContent.toString()
        .trim();

      this.edit_data = {
        Strategy,
        Position_Size,
        Status,
      };
    },
    saveData() {
      let strategy = this.edit_data["Strategy"];

      let position_size = Math.round(this.edit_data["Position_Size"]);

      let status = this.edit_data["Status"];
      
      const copied_strategies = this.strategies.map((o) => ({ ...o }));

      if (strategy != "" && position_size != "" && status != "") {
        this.$store
          .dispatch("updateStrategy", this.edit_data)
          .then((res) => {
            if (res.status == 201) {
              copied_strategies.map((row) => {
                if (row["Strategy"] == strategy) {
                  row["Position_Size"] = position_size;
                  row["Active"] = status;
                }

                return row;
              });

              this.strategies = copied_strategies;

              this.popup = false;

              alert(`${strategy} Updated.`);
            } else {
              alert("Strategy Fields Can Not Be Empty");
            }
          })
          .catch(() => {
            alert("Error: Failed To Update Strategy");
          });
      } else {
        alert("Error: Failed To Update Strategy");
      }
    },
  },
  created() {
    // WATCHERS

    // strategies
    this.$store.watch(
      (state) => {
        return state.dashboard.strategies;
      },
      (newValue) => {
        this.strategies = newValue;
      }
    );
  },
};
</script>

<style lang="scss">
.table-container {
  overflow: auto;

  .cursor {
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      opacity: 0.5;
    }
  }
}

#edit-strategy {
  display: grid;
  gap: 1em;
  width: 100%;

  input,
  select {
    color: black;
    font-size: 1rem;
    padding: 0.25em;
  }

  label {
    font-size: 0.9rem;
  }

  input[type="submit"] {
    transition: 0.2s ease;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }

  & > div {
    display: grid;
  }

  h6 {
    font-size: 1.1rem;
  }
}
</style>
