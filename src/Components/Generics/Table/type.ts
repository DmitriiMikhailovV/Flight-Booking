export type TTableColumn = {
  label: string
  property: string
}

export type TTable<Data extends Record<string, unknown>> = {
  columns: Array<TTableColumn>
  data: Array<Data>
  onRowClick?: (row: Data) => void
}
