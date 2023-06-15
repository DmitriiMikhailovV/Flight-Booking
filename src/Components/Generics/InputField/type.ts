import { TextFieldProps } from '@mui/material'
import { TMinMax, TStartEndDate } from 'src/Redux/features/flightsSlice/types'

export type TInputField = Omit<TextFieldProps, 'onChange'> & {
  field: string
  value: string | number | TMinMax | TStartEndDate
  onChange: (field: string, value: string) => void
  validationError: string
  label: string
  phoneNumber?: boolean
}
