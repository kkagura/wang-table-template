<template>
  <div class="w-menu-group">
    <template v-for="menu in visibleMenus" :key="menu.label">
      <MenuItem :menu="menu" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { IContextmenuItem } from "./contextmenu";
import { computed, type PropType } from "vue";
import MenuItem from "./MenuItem.vue";
const props = defineProps({
  menus: {
    type: Array as PropType<IContextmenuItem[]>,
    required: true,
  },
});

const visibleMenus = computed(() => {
  return props.menus.filter((menu) => !menu.hidden);
});
</script>
<style scoped lang="less"></style>
