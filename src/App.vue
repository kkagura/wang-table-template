<template>
  <div class="page">
    <Table :tableData="tableData" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { ITable } from "./components/table";
import Table from "./components/Table.vue";
const tableData = ref<ITable>({
  rowCount: 10,
  columnCount: 10,
  columns: {},
  rows: {},
  cells: {},
});
</script>
<style lang="less">
body {
  margin: 0;
  .page {
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }
}
</style>
