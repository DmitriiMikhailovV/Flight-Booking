import React, { FC } from 'react'
import { Grid, InputLabel } from '@mui/material'
import { TDateRangeInput } from './type'
import DatePicker from 'react-datepicker'
import './styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import {
  dateToUnix,
  unixToDate,
} from 'src/Redux/features/flightsSlice/flightSlice'

export const DateRangeInput: FC<TDateRangeInput> = ({
  fieldPrefix,
  startDate,
  endDate,
  onChange,
  label,
}) => {
  const handleStartDateChange = (date: Date) => {
    onChange(`${fieldPrefix}.startDate`, dateToUnix(date))
  }

  const handleEndDateChange = (date: Date) => {
    onChange(`${fieldPrefix}.endDate`, dateToUnix(date))
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item sx={{ width: '30%', minWidth: '100px' }}>
        <InputLabel sx={{ width: '100%' }}>{label}</InputLabel>
      </Grid>
      <Grid item width={'70%'}>
        <DatePicker
          selected={unixToDate(startDate)}
          onChange={handleStartDateChange}
          selectsStart
          startDate={unixToDate(startDate)}
          endDate={unixToDate(endDate)}
          dateFormat="yyyy-MM-dd h:mm aa"
          showTimeInput
          className="datepicker"
          placeholderText="Start Date"
        />
        <DatePicker
          selected={unixToDate(endDate)}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={unixToDate(startDate)}
          endDate={unixToDate(endDate)}
          dateFormat="yyyy-MM-dd h:mm aa"
          showTimeInput
          className="datepicker"
          placeholderText="End Date"
        />
      </Grid>
    </Grid>
  )
}
