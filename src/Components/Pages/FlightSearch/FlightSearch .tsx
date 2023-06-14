import React, { FC, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { CircularProgress, Typography } from '@mui/material'

import { AppDispatch, useAppSelector } from 'src/Redux/store'
import {
  fetchFlights,
  updateFilteredFlights,
  selectFlights,
} from 'src/Redux/features/flightsSlice/flightSlice'

import {
  Button,
  DateRangeInput,
  InputField,
  RangeInput,
  Table,
} from 'src/Components/Generics'
import type { TFlight } from 'src/Redux/features/flightsSlice/types'

import { columns } from './columns'
import {
  TFlightFilter,
  TMinMax,
  TStartEndDate,
} from 'src/Redux/features/flightsSlice/types'
import { useNavigate } from 'react-router-dom'

const initialFilter = {
  from: '',
  to: '',
  departure: {
    startDate: null,
    endDate: null,
  },
  arrival: {
    startDate: null,
    endDate: null,
  },
  duration: { min: 0, max: 24 },
  price: { min: 0, max: 1000 },
}

export const FlightSearch: FC = () => {
  const { flights, loadingFlights, errorFlights, filteredFlights } =
    useAppSelector(({ flightSlice }) => flightSlice)
  const navigate = useNavigate()

  const [flightFilter, setFlightFilter] = useState<TFlightFilter>(initialFilter)

  const dispatch = useDispatch<AppDispatch>()

  const handleFilterChange = (
    field: string,
    value: string | number | TMinMax | TStartEndDate | null
  ) => {
    const [parentField, childField] = field.split('.')
    setFlightFilter((prevFilter) => {
      if (childField && prevFilter[parentField as keyof typeof flightFilter]) {
        return {
          ...prevFilter,
          [parentField]: {
            ...(prevFilter[parentField] as any),
            [childField]: value,
          },
        }
      } else {
        return {
          ...prevFilter,
          [field]: value,
        }
      }
    })
  }

  const handleSearchClick = async () => {
    if (flights.length === 0) {
      await dispatch(fetchFlights())
      await dispatch(updateFilteredFlights(flightFilter))
    } else {
      dispatch(updateFilteredFlights(flightFilter))
    }
  }

  const handleClearFilterClick = async () => {
    setFlightFilter(initialFilter)
    await dispatch(updateFilteredFlights(initialFilter))
  }

  const handleRowClick = (row: any) => {
    dispatch(selectFlights(row))
    navigate(`/booking/${row.id}`)
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
        <Typography variant="h4" align="center" gutterBottom>
          Flight Search
        </Typography>
        {filterInputFields.map((field) => (
          <InputField
            key={field}
            field={field}
            value={flightFilter[field as keyof typeof flightFilter]}
            onChange={handleFilterChange}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            onlyText
          />
        ))}
        <DateRangeInput
          fieldPrefix="departure"
          startDate={flightFilter.departure.startDate}
          endDate={flightFilter.departure.endDate}
          onChange={handleFilterChange}
          label="Departure"
        />
        <DateRangeInput
          fieldPrefix="arrival"
          startDate={flightFilter.arrival.startDate}
          endDate={flightFilter.arrival.endDate}
          onChange={handleFilterChange}
          label="Arrival"
        />
        <RangeInput
          fieldPrefix="duration"
          minValue={flightFilter.duration.min}
          maxValue={flightFilter.duration.max}
          onChange={handleFilterChange}
          label="Duration"
        />
        <RangeInput
          fieldPrefix="price"
          minValue={flightFilter.price.min}
          maxValue={flightFilter.price.max}
          onChange={handleFilterChange}
          label="Price"
        />
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              color="secondary"
              onClick={handleClearFilterClick}
              label="Clear Filter"
            />
          </Grid>
          <Grid item>
            <Button onClick={handleSearchClick} label="Search" />
          </Grid>
        </Grid>
        {loadingFlights && <CircularProgress />}
        {errorFlights && (
          <Typography variant="h6" color="error" marginTop="16px">
            Error loading flights. Please try again.
          </Typography>
        )}
      </Box>
      {flights.length > 0 && filteredFlights.length === 0 ? (
        <Typography variant="h6" color="error" marginTop="16px">
          No data found with current filter
        </Typography>
      ) : (
        <Table<TFlight>
          data={filteredFlights}
          columns={columns}
          onRowClick={handleRowClick}
        />
      )}
    </Container>
  )
}
