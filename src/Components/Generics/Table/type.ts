export type TTableColumn = {
  label: string
  property: string
}

export type TTable = {
  columns: Array<TTableColumn>
  data: Array<{ [key: string]: unknown }>
}
