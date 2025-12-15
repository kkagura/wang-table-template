import { inject, provide, reactive, readonly, type InjectionKey } from "vue";
import type { ITable } from "./table";

export interface ITableState {
  readonly: boolean;
  tableData: ITable;
}

export interface ITableActions {
  setTableData: (tableData: ITable) => void;
}

export interface ITableStore {
  state: ITableState;
  actions: ITableActions;
}

export interface IStoreConfig {
  defaultRowCount?: number;
  defaultColumnCount?: number;
  defaultColumnWidth?: number | string;
  defaultRowHeight?: number | string;
}

const tableStoreKey: InjectionKey<Readonly<ITableStore>> = Symbol("tableStore");

export function initTableStore() {
  const store = reactive<ITableStore>({
    state: {
      readonly: false,
      tableData: {
        rowCount: 0,
        columnCount: 0,
        columns: {},
        rows: {},
      },
    },
    actions: {
      setTableData,
    },
  });

  function setTableData(tableData: ITable) {}

  provide(tableStoreKey, readonly(store));

  return store;
}

export function useTableStore() {
  return inject(tableStoreKey)!;
}
