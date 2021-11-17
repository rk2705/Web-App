<template>
  <div class="table-container">
    <div class="table-header-div">
      <h5>{{ tableName }}</h5>
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
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="(pair, index) in row" :key="index">{{ pair }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["tableData", "tableName"],
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
};
</script>

<style lang="scss">
.table-container {
  color: $primary-text;
  background-color: $primary-dark;
  padding: 1em;
  border: solid 1px $primary-light;

  .table-header-div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;

    h5 {
      font-size: 1rem;
      letter-spacing: 1.5px;
      font-style: italic;
    }

    span {
      font-size: 0.75rem;
    }
  }

  .table {
    overflow-y: auto;
    min-height: 106px;
    max-height: 300px;

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
