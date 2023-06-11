import React, { FC } from 'react'
import { Grid, InputLabel } from '@mui/material'
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
  label,
}) => {
  const handleStartDateChange = (date: Date | null) => {
    onChange(
      `${fieldPrefix}.startDate`,
      date === null ? null : dateToUnix(date)
    )
  }

  const handleEndDateChange = (date: Date | null) => {
    onChange(`${fieldPrefix}.endDate`, date === null ? null : dateToUnix(date))
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
      </Grid>
    </Grid>
  )
}
