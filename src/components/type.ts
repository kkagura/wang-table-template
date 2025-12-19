import type { Ref } from "vue";
import type { UnknownObject } from "../utils/type-helper";

export interface Store {
  state: UnknownObject;
  actions: Record<string, (...args: unknown[]) => void>;
}

export interface PluginHookRes {
  component?: any;
  store?: Store;
}

export interface PluginHook<Options extends UnknownObject> {
  (
    container: Ref<HTMLDivElement | undefined>,
    options?: Options
  ): PluginHookRes;
}

export type ICoordinate = [number, number];
