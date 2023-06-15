import { TextFieldProps } from '@mui/material'

export type TRangeInput = Omit<TextFieldProps, 'onChange'> & {
  fieldPrefix: string
  minValue: number
  maxValue: number
  onChange: (field: string, value: number) => void
  validationError: string
  label: string
}
