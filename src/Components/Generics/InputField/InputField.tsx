import React, { FC } from 'react'
import { Grid, TextField } from '@mui/material'
import { TInputField } from './type'
import { InputLabel } from '@mui/material'

export const InputField: FC<TInputField> = ({
  field,
  value,
  onChange,
  label,
}) => {
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item sx={{ width: '30%', minWidth: '100px' }}>
        <InputLabel sx={{ width: '100%' }}>{label}</InputLabel>
      </Grid>
      <Grid item xs>
        <TextField
          type="text"
          value={value}
          size="small"
          fullWidth
          onChange={(e) => onChange(field, e.target.value)}
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
}
