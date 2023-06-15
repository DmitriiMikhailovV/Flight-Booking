import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { TFlight } from 'src/Redux/features/flightsSlice/types'
import { Table } from 'src/Components/Generics'
import { columns } from './columns'
import { TFlightDetails } from './type'
import { humanDate } from 'src/utilits'

export const FlightDetails: FC<TFlightDetails> = ({
  flight,
  selectedSeats,
}) => {
  const updatedColumnsTitle = columns.map((column) => {
    if (column.dynamic && column.property === 'price') {
      return {
        ...column,
        label: `Price (${selectedSeats.length} seat${
          selectedSeats.length !== 1 ? 's' : ''
        })`,
      }
    }
    return column
  })

  const updatedFlight = {
    ...flight,
    price: flight.price * selectedSeats.length,
    departure: humanDate(flight.departure),
    arrival: humanDate(flight.arrival),
  }

  return (
    <Box>
      <Typography variant="h6" align="center">
        Flight Details:
      </Typography>
      {flight && (
        <Table<TFlight> columns={updatedColumnsTitle} data={[updatedFlight]} />
      )}
    </Box>
  )
}
