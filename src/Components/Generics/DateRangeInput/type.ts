export type TDateRangeInput = {
  fieldPrefix: string
  startDate: number
  endDate: number
  onChange: (field: string, value: number) => void
  label: string
}
