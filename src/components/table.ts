export interface ITableCell {
  template: string;
  rowspan: number;
  colspan: number;
  merged: boolean;
}

export type IndexKey = `${number}`;

export interface IColumnConfig {
  width: number | string;
}

export interface IRowData {
  height: number | string;
  cells: Record<IndexKey, ITableCell>;
}

export interface ITable {
  rowCount: number;
  columnCount: number;
  columns: Record<IndexKey, IColumnConfig>;
  rows: Record<IndexKey, IRowData>;
}
