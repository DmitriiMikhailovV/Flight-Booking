import React, { FC } from 'react'
import { Box, Container } from '@mui/material'

import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from 'src/Redux/store'
import {
  fetchFlights,
  setFilter,
} from 'src/Redux/features/flightsSlice/flightSlice'
import {
  Button,
  DateRangeInput,
  InputField,
  RangeInput,
  Table,
} from 'src/Components/Generics'
import { CircularProgress } from '@mui/material'
import { Typography } from '@mui/material'
import { columns } from './columns'
import { TMinMax, TStartEndDate } from 'src/Redux/features/flightsSlice/types'

export const FlightSearch: FC = () => {
  const { flights, flightFilter, loadingFlights, errorFlights } =
    useAppSelector((state) => state.flightSlice)

  // console.log(flightFilter)

  const dispatch = useDispatch<AppDispatch>()

  const handleFilterChange = (
    field: string,
    value: string | number | TMinMax | TStartEndDate
  ) => {
    const [parentField, childField] = field.split('.')
    if (childField) {
      dispatch(
        setFilter({
          ...flightFilter,
          [parentField]: Object.assign({}, flightFilter[parentField], {
            [childField]: value,
          }),
        })
      )
    } else {
      dispatch(setFilter({ [field]: value }))
    }
  }

  const filterInputFields = ['from', 'to']

  return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          marginTop: '16px',
          gap: '16px',
          flexDirection: 'column',
          width: '40%',
          minWidth: '250px',
          alignItems: 'center',
        }}
      >
        {filterInputFields.map((field) => (
          <InputField
            key={field}
            field={field}
            value={flightFilter[field]}
            onChange={handleFilterChange}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
        <DateRangeInput
          fieldPrefix={'departure'}
          startDate={flightFilter.departure.startDate}
          endDate={flightFilter.departure.endDate}
          onChange={handleFilterChange}
          label={'Departure'}
        />
        <DateRangeInput
          fieldPrefix={'arrival'}
          startDate={flightFilter.arrival.startDate}
          endDate={flightFilter.arrival.endDate}
          onChange={handleFilterChange}
          label={'Arrival'}
        />
        <RangeInput
          fieldPrefix={'duration'}
          minValue={flightFilter.duration.min}
          maxValue={flightFilter.duration.max}
          onChange={handleFilterChange}
          label={'Duration'}
        />
        <RangeInput
          fieldPrefix={'price'}
          minValue={flightFilter.price.min}
          maxValue={flightFilter.price.max}
          onChange={handleFilterChange}
          label={'Price'}
        />
        <Button onClick={() => dispatch(fetchFlights())} label={'Search'} />
        {loadingFlights && <CircularProgress />}
        {errorFlights && (
          <Typography variant="h6" color="error">
            Error loading flights. Please try again.
          </Typography>
        )}
      </Box>
      <Table data={flights} columns={columns} />
    </Container>
  )
}
