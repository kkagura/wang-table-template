<template>
  <div class="w-table-container">
    <table class="w-table">
      <colgroup>
        <col
          v-for="(_, column) in tableStore.state.tableData.columnCount"
          :key="column"
          :style="{ width: getSizeValue(tableStore.state.tableData.columns[`${column}`]!.width) }"
        />
      </colgroup>
      <tbody>
        <tr v-for="(_, row) in tableStore.state.tableData.rowCount" :key="row">
          <TableCell
            :row="tableStore.state.tableData.rows[`${row}`]!"
            :column="tableStore.state.tableData.columns[`${column}`]!"
            v-for="(_, column) in tableStore.state.tableData.columnCount"
            :key="`${row}-${column}`"
            :cell="tableStore.state.tableData.cells[`${row}`]![`${column}`]!"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { watch, type PropType } from "vue";
import type { ITable } from "./table";
import { initTableStore } from "./tableStore";
import TableCell from "./TableCell.vue";
import { getSizeValue } from "../utils/css";

const props = defineProps({
  tableData: {
    type: Object as PropType<Partial<ITable>>,
    default: () => ({}),
  },
});

const tableStore = initTableStore({});

watch(
  () => props.tableData,
  () => {
    tableStore.actions.setTableData(props.tableData);
  },
  {
    immediate: true,
  }
);
</script>
<style scoped lang="less">
.w-table-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  .w-table {
    width: 100%;
    border-collapse: collapse;
  }
}
</style>
