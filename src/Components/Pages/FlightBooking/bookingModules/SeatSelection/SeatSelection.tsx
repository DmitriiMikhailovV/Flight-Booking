import React, { FC } from 'react'
import { Grid, Typography } from '@mui/material'
import { TSeatSelection } from './type'
import { TSeat } from 'src/Redux/features/flightsSlice/types'
import './styles.css'

interface SeatSelectionProps extends TSeatSelection {
  handleSeatClick: (seat: TSeat) => void
}

export const SeatSelection: FC<SeatSelectionProps> = ({
  selectedFlight,
  selectedSeats,
  handleSeatClick,
  validationErrors,
}) => {
  const getSeatClassName = (seat: TSeat, available: boolean) => {
    let className = 'seat'
    if (selectedSeats.find((selectedSeat) => selectedSeat.id === seat.id)) {
      className += ' selected'
    } else if (!available) {
      className += ' unavailable'
    } else {
      className += ' available'
    }
    return className
  }

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      width="100%"
      minWidth="250px"
      padding="20px"
    >
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Please select your preferred seat(s):
        </Typography>
      </Grid>
      <Grid item xs={12} flexDirection={'column'}>
        {selectedFlight ? (
          <Grid container spacing={1} justifyContent="center" padding="20px">
            {selectedFlight.seats.map((seat) => (
              <Grid item key={seat.id}>
                <div
                  onClick={() => handleSeatClick(seat)}
                  className={getSeatClassName(seat, seat.available)}
                >
                  {seat.number}
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center">
            You have not selected a flight
          </Typography>
        )}
      </Grid>
      {validationErrors.selectedSeats !== '' && (
        <Typography
          variant="body1"
          color="error"
          sx={{ marginTop: '8px', marginBottom: '8px' }}
        >
          {validationErrors.selectedSeats}
        </Typography>
      )}
    </Grid>
  )
}
