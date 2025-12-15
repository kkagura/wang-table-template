<template>
  <div class="page"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { ITable } from "./components/table";

const tableData = ref<ITable>({
  rowCount: 10,
  columnCount: 10,
  columns: {},
  rows: {},
});
</script>
<style lang="less">
body {
  margin: 0;
  .page {
    width: 100vw;
    height: 100vh;
    background-color: #f0f0f0;
  }
}
</style>
