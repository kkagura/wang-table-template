import type { PluginHook } from "@/components/type";
import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  readonly,
  type InjectionKey,
  type Ref,
} from "vue";
import Contextmenu from "./Contextmenu.vue";

export interface IContextmenuItem {
  label: string;
  command: string;
  disabled: boolean;
  hidden: boolean;
  children?: IContextmenuItem[];
}

export interface IContextmenuStore {
  state: {
    visible: boolean;
    position: {
      x: number;
      y: number;
    };
    menus: IContextmenuItem[];
  };
  actions: {};
}

const contextmenuStoreKey: InjectionKey<Readonly<IContextmenuStore>> =
  Symbol("contextmenuStore");
function useContextmenuPluginImpl(
  tableContainerRef: Ref<HTMLDivElement | undefined>
) {
  const contextmenuStore = reactive<IContextmenuStore>({
    state: {
      visible: false,
      position: {
        x: 0,
        y: 0,
      },
      menus: [],
    },
    actions: {},
  });

  function show() {
    contextmenuStore.state.visible = true;
  }

  function hide() {}

  function handleContextmenu(event: MouseEvent) {
    event.preventDefault();
    show();
  }

  onMounted(() => {
    tableContainerRef.value!.addEventListener("contextmenu", handleContextmenu);
  });

  onUnmounted(() => {
    tableContainerRef.value!.removeEventListener(
      "contextmenu",
      handleContextmenu
    );
  });

  provide(
    contextmenuStoreKey,
    readonly(contextmenuStore) as Readonly<IContextmenuStore>
  );

  return {
    name: contextmenuStoreKey,
    component: Contextmenu,
    store: contextmenuStore,
  };
}

export const useContextmenuPlugin = useContextmenuPluginImpl as PluginHook<{}>;

export const useContextmenuStore = () => inject(contextmenuStoreKey)!;
