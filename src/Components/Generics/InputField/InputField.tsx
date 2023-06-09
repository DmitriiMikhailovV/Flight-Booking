import React, { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'
import { TInputField } from './type'

export const InputField: FC<TInputField> = ({
  field,
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value)
  }

  return (
    <TextField
      type="text"
      value={value}
      onChange={handleChange}
      label={placeholder}
      variant="outlined"
    />
  )
}
