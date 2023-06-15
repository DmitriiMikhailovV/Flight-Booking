import React, { FC } from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import { TInputField } from './type'
import { InputLabel } from '@mui/material'

export const InputField: FC<TInputField> = ({
  field,
  value,
  onChange,
  label,
  validationError,
  phoneNumber,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(field, inputValue)
  }

  const prefillValue = phoneNumber && value === '' ? '+' : value

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item sx={{ width: '30%', minWidth: '100px' }}>
          <InputLabel sx={{ width: '100%' }}>{label}</InputLabel>
        </Grid>
        <Grid item xs>
          <TextField
            type="text"
            value={prefillValue}
            size="small"
            fullWidth
            onChange={handleChange}
            variant="outlined"
          />
          {validationError !== '' && (
            <Typography
              variant="body1"
              color="error"
              sx={{ marginTop: '8px', marginBottom: '8px' }}
            >
              {validationError}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  )
}
