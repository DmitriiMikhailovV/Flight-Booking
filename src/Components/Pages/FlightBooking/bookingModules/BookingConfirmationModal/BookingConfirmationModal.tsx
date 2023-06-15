import { FC } from 'react'
import { Modal, Box, Typography, Grid } from '@mui/material'
import { Button } from 'src/Components/Generics'
import { FlightDetails } from '../FlightDetails'
import { TBookingConfirmationModal } from './type'
import './styles.css'

export const BookingConfirmationModal: FC<TBookingConfirmationModal> = ({
  isModalOpen,
  selectedFlight,
  selectedSeats,
  passengerDetails,
  closeModal,
  navigateToSearch,
}) => {
  return (
    <Modal open={isModalOpen}>
      <Box className="modalBox">
        <>
          <Typography variant="h5" align="center" gutterBottom>
            Booking completed
          </Typography>
          {selectedFlight && (
            <FlightDetails
              flight={selectedFlight}
              selectedSeats={selectedSeats}
            />
          )}
          <Box mt={2}>
            <Typography variant="h6" align="center" gutterBottom>
              Your Seats:
            </Typography>
            <Grid
              container
              justifyContent="center"
              spacing={3}
              marginBottom="8px"
            >
              {selectedSeats.map((seat) => (
                <Grid item key={seat.id}>
                  <Typography>{seat.number}</Typography>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" align="center" gutterBottom>
              Passenger: {passengerDetails.name} {passengerDetails.surname}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Email: {passengerDetails.email}
            </Typography>
            <Typography variant="body1" align="center">
              Phone: {passengerDetails.phone}
            </Typography>
          </Box>

          <Grid
            container
            marginTop={'16px'}
            display="flex"
            spacing={2}
            justifyContent="center"
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={closeModal}
                label={'Book Extra Seats'}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={navigateToSearch}
                label={'Go to Search Flights'}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      </Box>
    </Modal>
  )
}
