import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  readonly,
  type InjectionKey,
  type Reactive,
  type Ref,
} from "vue";
import type { ICoordinate, PluginHook, Store } from "../../type";
import Selector from "./Selector.vue";
import { findParentElement, getElementsDistance } from "@/utils/dom";
import { useDragger } from "@/hooks/use-dragger";
import { camelCaseToKebabCase } from "@/utils/string";

const defaultCssVariables = {
  borderWidth: "2px",
  borderColor: "#1E6FFF",
};

function setCssVariables() {
  Object.entries(defaultCssVariables).forEach(([key, value]) => {
    key = `--w-selector-${camelCaseToKebabCase(key)}`;
    document.documentElement.style.setProperty(key, value);
  });
}

function resetCssVariables() {
  Object.entries(defaultCssVariables).forEach(([key]) => {
    key = `--w-selector-${camelCaseToKebabCase(key)}`;
    document.documentElement.style.removeProperty(key);
  });
}

export interface ISelectorStore {
  state: {
    start: ICoordinate | null;
    end: ICoordinate | null;
    rect: { top: number; left: number; width: number; height: number } | null;
  };
  actions: {
    setSelectionRange: (start: ICoordinate, end: ICoordinate) => void;
    clearSelection: () => void;
  };
}

const selectorStoreKey: InjectionKey<Readonly<ISelectorStore>> =
  Symbol("selectorStore");

function useSelectorPluginImpl(
  tableContainerRef: Ref<HTMLDivElement | undefined>
) {
  const selectorStore = reactive<ISelectorStore>({
    state: {
      start: null,
      end: null,
      rect: null,
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

  function getTable(): HTMLTableElement {
    const container = tableContainerRef.value!;
    return container.querySelector(".w-table")!;
  }

  let startTd: HTMLElement | null = null;
  function handleDragStart(event: MouseEvent) {
    const td = findParentElement(
      event.target as HTMLElement,
      (element: HTMLElement) => element.tagName === "TD"
    );
    if (!td) return;
    event.preventDefault();
    const rowIndex = td.getAttribute("data-row-index")!;
    const columnIndex = td.getAttribute("data-column-index")!;
    selectorStore.state.start = [parseInt(rowIndex), parseInt(columnIndex)];
    selectorStore.state.end = [parseInt(rowIndex), parseInt(columnIndex)];
    const bounds = td.getBoundingClientRect();
    selectorStore.state.rect = {
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
    };
    startTd = td;
  }

  function handleDrag(_1: number, _2: number, event: MouseEvent) {
    const td = findParentElement(
      event.target as HTMLElement,
      (element: HTMLElement) => element.tagName === "TD"
    );
    if (!td) return;
    if (!startTd || startTd === td) return;
    event.preventDefault();
    const rowIndex = td.getAttribute("data-row-index")!;
    const columnIndex = td.getAttribute("data-column-index")!;
    selectorStore.state.end = [parseInt(rowIndex), parseInt(columnIndex)];
    const startTdBounds = startTd.getBoundingClientRect();
    const currentTdBounds = td.getBoundingClientRect();
    const top = Math.min(currentTdBounds.top, startTdBounds.top);
    const left = Math.min(currentTdBounds.left, startTdBounds.left);
    let width: number, height: number;
    if (currentTdBounds.left > selectorStore.state.rect!.left) {
      width = currentTdBounds.left - startTdBounds.left + currentTdBounds.width;
    } else {
      width = startTdBounds.width + startTdBounds.left - currentTdBounds.left;
    }
    if (currentTdBounds.top > startTdBounds.top) {
      height = currentTdBounds.top - startTdBounds.top + currentTdBounds.height;
    } else {
      height = startTdBounds.height + startTdBounds.top - currentTdBounds.top;
    }
    selectorStore.state.rect = {
      top,
      left,
      width,
      height,
    };
  }

  function handleDragEnd(_: MouseEvent) {
    startTd = null;
  }

  useDragger(tableContainerRef, {
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  });

  onMounted(() => {
    setCssVariables();
  });

  onUnmounted(() => {
    resetCssVariables();
  });

  provide(
    selectorStoreKey,
    readonly(selectorStore) as Readonly<ISelectorStore>
  );

  return {
    name: selectorStoreKey,
    component: Selector,
    store: selectorStore,
  };
}

export const useSelectorPlugin = useSelectorPluginImpl as PluginHook<{}>;

export const useSelectorStore = () => inject(selectorStoreKey)!;
