<template>
  <div
    @click="store.actions.handleMenuItemClick(menu.command)"
    class="w-menu-item"
  >
    <div class="w-menu-item-label">{{ menu.label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useContextmenuStore, type IContextmenuItem } from "./contextmenu";
import { type PropType } from "vue";
const props = defineProps({
  menu: {
    type: Object as PropType<IContextmenuItem>,
    required: true,
  },
});

const store = useContextmenuStore();
</script>
<style scoped lang="less">
.w-menu-item {
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
