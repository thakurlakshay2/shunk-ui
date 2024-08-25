export enum TableHeaderField {
  ACTIONS = "actions",
  CHECKBOX = "checkbox ",
  RANK = "rank",
  CRYPTO_INFO = "cryptoInfo",
  CRYPTO_PRICE = "price",
  MARKET_CAP = "marketCap",
  CHANGE = "change",
  CHANGE_PERCENTAGE = "changePercentage",
}
export interface TableHeaders {
  field: TableHeaderField;
  component: string | React.ReactNode;
  isSortable?: boolean;
  align?: string;
}

export interface TableRows {
  field: TableHeaderField;
  component: string | number | React.ReactNode;
  className?: string;
}

export interface DataTableProps {
  headers: TableHeaders[];
  rows: TableRows[][];
  columnSizes?: number[];
}
