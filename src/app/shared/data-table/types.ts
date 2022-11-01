export interface DataTableColumn {
  key: string,
  name: string,
  width?: number
}

export type DataTableItem = Record<string, string | number | boolean>