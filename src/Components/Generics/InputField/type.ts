import { TextFieldProps } from '@mui/material'

export type TInputField = Omit<TextFieldProps, 'onChange'> & {
  field: string
  value: string | number
  onChange: (field: string, value: string) => void
  placeholder: string
}
