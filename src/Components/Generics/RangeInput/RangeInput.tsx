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
  const handleMinChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(`${fieldPrefix}.min`, parseInt(e.target.value))
  }

  const handleMaxChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(`${fieldPrefix}.max`, parseInt(e.target.value))
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
          onChange={(e) => handleMinChange(e)}
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
          onChange={(e) => handleMaxChange(e)}
          inputProps={{
            step: 1,
            min: minValue,
          }}
        />
      </Grid>
    </Grid>
  )
}
