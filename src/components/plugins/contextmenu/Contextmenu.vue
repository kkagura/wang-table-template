<template>
  <div v-if="store.state.visible" class="w-contextmenu" :style="style">
    <MenuGroup :menus="store.state.menus" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useContextmenuStore } from "./contextmenu";
import MenuGroup from "./MenuGroup.vue";

const store = useContextmenuStore();

const style = computed(() => {
  return {
    top: store.state.position.y + "px",
    left: store.state.position.x + "px",
  };
});
</script>
<style scoped lang="less">
.w-contextmenu {
  position: absolute;
  z-index: 2;
  background-color: #fff;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
