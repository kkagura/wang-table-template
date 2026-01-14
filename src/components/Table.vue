<template>
  <div class="w-table-container" ref="tableContainerRef">
    <table class="w-table">
      <colgroup>
        <col
          v-for="(_, columnIndex) in tableStore.state.tableData.columnCount"
          :key="columnIndex"
          :style="{ width: getSizeValue(tableStore.state.tableData.columns[`${columnIndex}`]!.width) }"
        />
      </colgroup>
      <tbody>
        <tr
          v-for="(_, rowIndex) in tableStore.state.tableData.rowCount"
          :key="rowIndex"
        >
          <TableCell
            :rowIndex="rowIndex"
            :columnIndex="columnIndex"
            :row="tableStore.state.tableData.rows[`${rowIndex}`]!"
            :column="tableStore.state.tableData.columns[`${columnIndex}`]!"
            v-for="(_, columnIndex) in tableStore.state.tableData.columnCount"
            :key="`${rowIndex}-${columnIndex}`"
            :cell="tableStore.state.tableData.cells[`${rowIndex}`]![`${columnIndex}`]!"
          />
        </tr>
      </tbody>
    </table>
    <template v-for="component in components" :key="component.name">
      <component :is="component" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from "vue";
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

const tableContainerRef = ref<HTMLDivElement>();
const { store: tableStore, components } = initTableStore(tableContainerRef, {});

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
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .w-table {
    width: 100%;
    border-collapse: collapse;
  }
}
</style>
