import { inject, provide, reactive, readonly, type InjectionKey } from "vue";
import type {
  IColumnConfig,
  IndexKey,
  IRowData,
  ITable,
  ITableCell,
} from "./table";

export interface ITableState {
  readonly: boolean;
  tableData: ITable;
}

export interface ITableActions {
  setTableData: (tableData: Partial<ITable>) => void;
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

export function initTableStore(storeConfig: IStoreConfig) {
  const {
    defaultRowCount = 10,
    defaultColumnCount = 10,
    defaultColumnWidth = 100,
    defaultRowHeight = 100,
  } = storeConfig;

  function createColumnData(): IColumnConfig {
    return {
      width: defaultColumnWidth,
    };
  }

  function createRowData(): IRowData {
    return {
      height: defaultRowHeight,
    };
  }

  function createCellData(): ITableCell {
    return {
      template: "",
      rowspan: 1,
      colspan: 1,
      merged: false,
    };
  }

  const store = reactive<ITableStore>({
    state: {
      readonly: false,
      tableData: {
        rowCount: 0,
        columnCount: 0,
        columns: {},
        rows: {},
        cells: {},
      },
    },
    actions: {
      setTableData,
    },
  });

  function setTableData(tableData: Partial<ITable>) {
    tableData = JSON.parse(JSON.stringify(tableData));
    store.state.tableData = {
      rowCount: tableData.rowCount ?? defaultRowCount,
      columnCount: tableData.columnCount ?? defaultColumnCount,
      columns: tableData.columns ?? {},
      rows: tableData.rows ?? {},
      cells: tableData.cells ?? {},
    };
    for (let i = 0; i < store.state.tableData.rowCount; i++) {
      const key: IndexKey = `${i}`;
      if (!store.state.tableData.rows[key]) {
        store.state.tableData.rows[key] = createRowData();
      }
    }
    for (let i = 0; i < store.state.tableData.columnCount; i++) {
      const key: IndexKey = `${i}`;
      if (!store.state.tableData.columns[key]) {
        store.state.tableData.columns[key] = createColumnData();
      }
    }
    for (let i = 0; i < store.state.tableData.rowCount; i++) {
      const rowKey: IndexKey = `${i}`;
      const row =
        store.state.tableData.cells[rowKey] ||
        (store.state.tableData.cells[rowKey] = {} as Record<
          IndexKey,
          ITableCell
        >);

      for (let j = 0; j < store.state.tableData.columnCount; j++) {
        const columnKey: IndexKey = `${j}`;
        if (!row[columnKey]) {
          row[columnKey] = createCellData();
        }
      }
    }
    console.log(store.state.tableData);
  }

  provide(tableStoreKey, readonly(store));

  return store;
}

export function useTableStore() {
  return inject(tableStoreKey)!;
}
