import {
  onMounted,
  provide,
  reactive,
  readonly,
  type InjectionKey,
  type Reactive,
  type Ref,
} from "vue";
import type { ICoordinate, PluginHook, Store } from "../../type";
import Selector from "./Selector.vue";

export interface ISelectorStore {
  state: {
    start: ICoordinate | null;
    end: ICoordinate | null;
  };
  actions: {
    setSelectionRange: (start: ICoordinate, end: ICoordinate) => void;
    clearSelection: () => void;
  };
}

const selectorStoreKey: InjectionKey<Readonly<ISelectorStore>> =
  Symbol("selectorStore");

function useSelectorPluginImpl(tableContainerRef: Ref<HTMLDivElement | undefined>) {
  const selectorStore = reactive<ISelectorStore>({
    state: {
      start: null,
      end: null,
    },
    actions: {
      setSelectionRange,
      clearSelection,
    },
  });

  function setSelectionRange(start: ICoordinate, end: ICoordinate) {
    selectorStore.state.start = start;
    selectorStore.state.end = end;
  }

  function clearSelection() {
    selectorStore.state.start = null;
    selectorStore.state.end = null;
  }

  onMounted(() => {
    const container = tableContainerRef.value!;
    const table = container.querySelector(".w-table")!;
  });

  provide(
    selectorStoreKey,
    readonly(selectorStore) as Readonly<ISelectorStore>
  );

  return {
    component: Selector,
    store: selectorStore,
  };
}

export const useSelectorPlugin = useSelectorPluginImpl as PluginHook<{}>;
