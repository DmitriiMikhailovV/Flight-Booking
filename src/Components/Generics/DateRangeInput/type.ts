export type TDateRangeInput = {
  fieldPrefix: string
  startDate: number | null
  endDate: number | null
  onChange: (field: string, value: number | null) => void
  label: string
}
