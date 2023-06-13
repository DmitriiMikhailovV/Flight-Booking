import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import './styles.css'
import { Button, InputField, Table } from 'src/Components/Generics'
import { AppDispatch, useAppSelector } from 'src/Redux/store'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchFlights,
  selectFlights,
} from 'src/Redux/features/flightsSlice/flightSlice'
import { TFlight, TSeat } from 'src/Redux/features/flightsSlice/types'
import { columns } from './columns'

export const FlightBooking: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  const { flights, loadingFlights, errorFlights, selectedFlight } =
    useAppSelector(({ flightSlice }) => flightSlice)

  const [selectedSeats, setSelectedSeats] = useState<Array<TSeat>>([])
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  console.log(bookingConfirmed)

  useEffect(() => {
    if (!flights || flights.length === 0) {
      dispatch(fetchFlights())
      const selected: TFlight | undefined = undefined
      dispatch(selectFlights(selected))
    } else {
      const selected: TFlight | undefined = flights.find(
        (flight) => flight.id === Number(id)
      )
      selected && dispatch(selectFlights(selected))
    }
  }, [flights, id])

  const handleInputChange = (field: string, value: string) => {
    setPassengerDetails((prevPassengerDetails) => ({
      ...prevPassengerDetails,
      [field]: value,
    }))
  }

  const handleBookingConfirmation = () => {
    setBookingConfirmed(true)
  }

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

  const handleSeatClick = (seat: TSeat) => {
    if (seat.available) {
      const updatedSeats = [...selectedSeats]
      const seatIndex = updatedSeats.findIndex(
        (selectedSeat) => selectedSeat.id === seat.id
      )
      if (seatIndex !== -1) {
        updatedSeats.splice(seatIndex, 1)
      } else {
        const updatedSeat = { ...seat, available: !seat.available }
        updatedSeats.push(updatedSeat)
      }
      setSelectedSeats(updatedSeats)
    }
  }

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
          Seat Selection
        </Typography>
        {loadingFlights && <CircularProgress />}
        {errorFlights && (
          <Typography variant="h6" color="error" marginTop="16px">
            Error loading flights. Please try again.
          </Typography>
        )}
        {selectedFlight && (
          <>
            <Box>
              <Typography variant="h6" align="center" gutterBottom>
                Flight Details:
              </Typography>
              {selectedFlight && (
                <Table<TFlight> columns={columns} data={[selectedFlight]} />
              )}
              <Box>
                <Typography variant="h5" align="center" gutterBottom>
                  Seat Selection
                </Typography>
              </Box>
            </Box>

            <Grid
              container
              spacing={3}
              justifyContent={'center'}
              width={'100%'}
              minWidth={'250px'}
              padding={'20px'}
            >
              <Typography variant="h6" align="center">
                Please select your preferred seat(s):
              </Typography>
              <Grid width={'100%'} justifyContent="center">
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  padding={'20px'}
                >
                  {selectedFlight ? (
                    selectedFlight.seats.map((seat) => (
                      <Grid item key={seat.id}>
                        <div
                          onClick={() => handleSeatClick(seat)}
                          className={getSeatClassName(seat, seat.available)}
                        >
                          {seat.number}
                        </div>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1" align="center">
                      You have not selected a flight
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <Typography variant="h4" align="center" gutterBottom>
          Passenger Details
        </Typography>
        <InputField
          field="name"
          label="name"
          value={passengerDetails.name}
          onChange={handleInputChange}
          onlyText
        />
        <InputField
          field="surname"
          label="surname"
          value={passengerDetails.surname}
          onChange={handleInputChange}
          onlyText
        />
        <InputField
          field="email"
          type="email"
          label="email"
          value={passengerDetails.email}
          onChange={handleInputChange}
        />
        <InputField
          field="phone"
          type="tel"
          label="phone"
          value={passengerDetails.phone}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookingConfirmation}
          fullWidth
          label="Confirm Booking"
        />
      </Box>
    </Container>
  )
}
