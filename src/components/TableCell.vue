<template>
  <td class="w-table-cell" :style="cellStyle" v-if="!cell.merged"></td>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
import type { IRowData, ITableCell } from "./table";
import type { IColumnConfig } from "./table";
import { getSizeValue } from "../utils/css";

const props = defineProps({
  row: {
    type: Object as PropType<IRowData>,
    required: true,
  },
  column: {
    type: Object as PropType<IColumnConfig>,
    required: true,
  },
  cell: {
    type: Object as PropType<ITableCell>,
    required: true,
  },
});

const rowHeight = computed(() => getSizeValue(props.row.height));
const cellStyle = computed(() => ({
  height: rowHeight.value,
}));
</script>
<style scoped lang="less">
.w-table-cell {
  border: 1px solid #000;
}
</style>
