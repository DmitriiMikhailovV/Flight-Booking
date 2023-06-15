import { FC } from 'react'
import { Grid, TextField, InputLabel, Typography } from '@mui/material'
import { TRangeInput } from './type'

export const RangeInput: FC<TRangeInput> = ({
  fieldPrefix,
  minValue,
  maxValue,
  onChange,
  validationError,
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
    <Grid
      container
      spacing={1}
      alignItems="center"
      // justifyContent="flex-end"
      sx={{ marginTop: '2px', marginBottom: '2px' }}
    >
      <Grid item sx={{ width: '30%', minWidth: '100px' }}>
        <InputLabel sx={{ width: '100%' }}>{label}</InputLabel>
      </Grid>
      <Grid container width={'70%'} paddingLeft="8px">
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
  )
}
