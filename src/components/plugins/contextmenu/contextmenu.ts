import type { PluginHook } from "@/components/type";
import {
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  readonly,
  type InjectionKey,
  type Ref,
} from "vue";
import Contextmenu from "./Contextmenu.vue";
import { findParentElement } from "@/utils/dom";

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
  actions: {
    handleMenuItemClick: (command: string) => void;
  };
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
      menus: [
        {
          label: "合并单元格",
          command: "mergeCells",
          disabled: false,
          hidden: false,
        },
      ],
    },
    actions: {
      handleMenuItemClick,
    },
  });

  function handleMenuItemClick(command: string) {
    console.log(command);
  }

  function show() {
    contextmenuStore.state.visible = true;
  }

  function caculatePosition(event: MouseEvent) {
    const { pageX, pageY } = event;
    contextmenuStore.state.position = {
      x: pageX,
      y: pageY,
    };
  }

  function hide() {
    contextmenuStore.state.visible = false;
  }

  async function handleContextmenu(event: MouseEvent) {
    event.preventDefault();
    show();
    await nextTick();
    caculatePosition(event);
    function clickOutside(event: MouseEvent) {
      if (
        !findParentElement(event.target as HTMLElement, (element) =>
          element.classList.contains("w-contextmenu")
        )
      ) {
        hide();
        document.removeEventListener("mousedown", clickOutside);
      }
    }
    document.addEventListener("mousedown", clickOutside);
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
