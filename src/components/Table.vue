<template>
  <div class="w-table-container"></div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { ITable } from "./table";

const props = defineProps({
  tableData: {
    type: Object as PropType<ITable>,
  },
});
</script>
<style scoped lang="less"></style>
