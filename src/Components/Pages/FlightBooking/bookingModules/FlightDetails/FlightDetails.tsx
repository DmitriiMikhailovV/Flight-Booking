import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { TFlight } from 'src/Redux/features/flightsSlice/types'
import { Table } from 'src/Components/Generics'
import { columns } from './columns'
import { TFlightDetails } from './type'

export const FlightDetails: FC<TFlightDetails> = ({ flight }) => {
  return (
    <Box>
      <Typography variant="h6" align="center">
        Flight Details:
      </Typography>
      {flight && <Table<TFlight> columns={columns} data={[flight]} />}
    </Box>
  )
}
