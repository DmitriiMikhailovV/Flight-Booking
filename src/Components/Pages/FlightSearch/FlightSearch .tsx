import React, { FC } from 'react'
import { Container } from '@mui/material'

import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from 'src/Redux/store'
import { fetchFlights } from 'src/Redux/features/flightsSlice/flightSlice'
import { setFilter } from 'src/Redux/features/flightFilterSlice/flightFilterSlice'
import { Button, InputField } from 'src/Components/Generics'
import { CircularProgress } from '@mui/material'
import { Typography } from '@mui/material'

export const FlightSearch: FC = () => {
  const { filter } = useAppSelector((state) => ({
    filter: state.flightFilter,
  }))
  const dispatch = useDispatch<AppDispatch>()
  const { flights, loadingFlights, errorFlights } = useAppSelector(
    (state) => state.flights
  )

  console.log(flights)

  const handleFilterChange = (field: string) => (value: string) => {
    dispatch(setFilter({ [field]: value }))
  }

  const filterFields = [
    'from',
    'to',
    'departure',
    'arrival',
    'duration',
    'price',
  ]

  return (
    <Container maxWidth="lg" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {filterFields.map((field) => (
        <InputField
          key={field}
          field={field}
          value={filter[field]}
          onChange={handleFilterChange(field)}
          placeholder={
            field === 'price'
              ? field.charAt(0).toUpperCase() + field.slice(1) + ' more than'
              : field.charAt(0).toUpperCase() + field.slice(1)
          }
        />
      ))}
      <Button onClick={() => dispatch(fetchFlights())} label={'Search'} />
      {loadingFlights && <CircularProgress />}
      {errorFlights && (
        <Typography variant="body1" color="error">
          Error loading flights. Please try again.
        </Typography>
      )}
    </Container>
  )
}
