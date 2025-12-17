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
}

export interface ITable {
  rowCount: number;
  rows: Record<IndexKey, IRowData>;
  columnCount: number;
  columns: Record<IndexKey, IColumnConfig>;
  cells: Record<IndexKey, Record<IndexKey, ITableCell>>;
}
