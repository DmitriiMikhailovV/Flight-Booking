import React, { FC } from 'react'
import { Grid, InputLabel, Typography } from '@mui/material'
import { TDateRangeInput } from './type'
import DatePicker from 'react-datepicker'
import './styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import { dateToUnix, unixToDate } from 'src/helpers'

export const DateRangeInput: FC<TDateRangeInput> = ({
  fieldPrefix,
  startDate,
  endDate,
  onChange,
  validationError,
  label,
}) => {
  const handleStartDateChange = (startDate: Date | null) => {
    onChange(
      `${fieldPrefix}.startDate`,
      startDate === null ? null : dateToUnix(startDate)
    )
  }

  const handleEndDateChange = (endDate: Date | null) => {
    onChange(
      `${fieldPrefix}.endDate`,
      endDate === null ? null : dateToUnix(endDate)
    )
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item sx={{ width: '30%', minWidth: '100px' }}>
        <InputLabel sx={{ width: '100%' }}>{label}</InputLabel>
      </Grid>
      <Grid item width={'70%'}>
        <DatePicker
          selected={startDate === null ? null : unixToDate(startDate)}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate === null ? null : unixToDate(startDate)}
          endDate={endDate === null ? null : unixToDate(endDate)}
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          showTimeSelect
          className="datepicker"
          placeholderText="Start Date"
          isClearable
        />
        <DatePicker
          selected={endDate === null ? null : unixToDate(endDate)}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate === null ? null : unixToDate(startDate)}
          endDate={endDate === null ? null : unixToDate(endDate)}
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          showTimeSelect
          className="datepicker"
          placeholderText="End Date"
          isClearable
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
  )
}
