<template>
  <div v-if="store.state.rect" class="w-selector" :style="style"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useSelectorStore } from "./selector";

const store = useSelectorStore();

const style = computed(() => {
  if (!store.state.rect) return {};
  return {
    top: store.state.rect.top - 1 + "px",
    left: store.state.rect.left - 1 + "px",
    width: store.state.rect.width - 2 + "px",
    height: store.state.rect.height - 2 + "px",
  };
});
</script>
<style scoped lang="less">
.w-selector {
  position: absolute;
  border: var(--w-selector-border-width) solid var(--w-selector-border-color);
  z-index: 2;
  pointer-events: none;
}
</style>
