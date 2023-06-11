import { FC } from 'react'
import { Grid, TextField, InputLabel } from '@mui/material'
import { TRangeInput } from './type'

export const RangeInput: FC<TRangeInput> = ({
  fieldPrefix,
  minValue,
  maxValue,
  onChange,
  label,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    onChange(`${fieldPrefix}.min`, !isNaN(newValue) ? newValue : minValue)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    onChange(`${fieldPrefix}.max`, !isNaN(newValue) ? newValue : maxValue)
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item sx={{ width: '30%', minWidth: '100px' }}>
        <InputLabel sx={{ width: '100%' }}>{label}</InputLabel>
      </Grid>
      <Grid item xs sx={{ width: 'calc(50% - 8px)', marginRight: '8px' }}>
        <TextField
          type="number"
          size="small"
          value={minValue}
          label={'Min'}
          fullWidth
          onChange={handleMinChange}
          inputProps={{
            step: 1,
            min: 0,
            max: maxValue,
          }}
        />
      </Grid>
      <Grid item xs sx={{ width: 'calc(50% - 8px)', marginLeft: '8px' }}>
        <TextField
          type="number"
          size="small"
          label={'Max'}
          fullWidth
          value={maxValue}
          onChange={handleMaxChange}
          inputProps={{
            step: 1,
            min: minValue,
          }}
        />
      </Grid>
    </Grid>
  )
}
