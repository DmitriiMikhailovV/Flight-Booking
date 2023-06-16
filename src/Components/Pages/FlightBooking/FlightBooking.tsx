import React, { FC, useEffect, useState } from 'react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchFlights,
  selectFlights,
  updateFlightInFlights,
} from 'src/Redux/features/flightsSlice/flightSlice'
import { TFlight, TSeat } from 'src/Redux/features/flightsSlice/types'
import { AppDispatch, useAppSelector } from 'src/Redux/store'
import { Button } from 'src/Components/Generics'
import {
  BookingConfirmationModal,
  FlightDetails,
  PassengerDetails,
  SeatSelection,
} from './bookingModules'
import { useNavigate } from 'react-router-dom'
import { TValidationErrors } from '../FlightSearch/type'
import { validateFlightBooking } from './flightBookingValidation'
import { TPassengersDetails } from './bookingModules/type'

const initialValidationError: TValidationErrors = {
  selectedSeats: '',
  name: '',
  surname: '',
  email: '',
  phone: '',
}

export const FlightBooking: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const navigate = useNavigate()

  const { flights, loadingFlights, errorFlights, selectedFlight } =
    useAppSelector(({ flightSlice }) => flightSlice)
  const [selectedSeats, setSelectedSeats] = useState<Array<TSeat>>([])
  const [passengerDetails, setPassengerDetails] = useState<TPassengersDetails>({
    name: '',
    surname: '',
    email: '',
    phone: '',
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [validationErrors, setValidationErrors] = useState<TValidationErrors>(
    initialValidationError
  )

  const getSelectedFlight = () => {
    if (!flights || flights.length === 0) {
      dispatch(fetchFlights())
      dispatch(selectFlights(undefined))
    } else {
      const selected = flights.find((flight) => flight.id === Number(id))
      selected && dispatch(selectFlights(selected))
    }
  }

  useEffect(() => {
    getSelectedFlight()
  }, [flights, id, dispatch])

  const handleInputChange = (field: string, value: string) => {
    setPassengerDetails((prevPassengerDetails) => ({
      ...prevPassengerDetails,
      [field]: value,
    }))
  }

  const handleBookingConfirmation = () => {
    const errors = validateFlightBooking({ selectedSeats, ...passengerDetails })

    if (Object.values(errors).every((value) => value === '')) {
      if (selectedFlight) {
        const updatedSeats: Array<TSeat> = selectedFlight.seats.map((seat) => {
          const matchingSeat = selectedSeats.find(
            (selectedSeat) => seat.id === selectedSeat.id
          )
          return matchingSeat ? { ...matchingSeat } : seat
        })

        const updatedFlight: TFlight = {
          ...selectedFlight,
          seats: updatedSeats,
        }

        dispatch(updateFlightInFlights(updatedFlight))
        getSelectedFlight()
        setSelectedSeats([])
        setIsModalOpen(true)
      }
    } else {
      setValidationErrors(errors)
    }
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

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onNavigateToSearch = () => {
    navigate(`/search`)
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box
          sx={{
            display: 'flex',
            marginTop: '16px',
            gap: '16px',
            flexDirection: 'column',
            width: '50%',
            minWidth: '250px',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" align="center">
            Booking flight
          </Typography>
          {loadingFlights && <CircularProgress />}
          {errorFlights && (
            <Typography variant="h6" color="error" marginTop="16px">
              Error loading flights. Please try again.
            </Typography>
          )}
          {selectedFlight && (
            <>
              <FlightDetails
                flight={selectedFlight}
                selectedSeats={selectedSeats}
              />
              <SeatSelection
                selectedFlight={selectedFlight}
                selectedSeats={selectedSeats}
                handleSeatClick={handleSeatClick}
                validationErrors={validationErrors}
              />
            </>
          )}
          <PassengerDetails
            passengerDetails={passengerDetails}
            handleInputChange={handleInputChange}
            validationErrors={validationErrors}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookingConfirmation}
            fullWidth
            label="Confirm Booking"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={onNavigateToSearch}
            fullWidth
            label="Go to Search Flights"
          />
        </Box>
      </Box>

      <BookingConfirmationModal
        isModalOpen={isModalOpen}
        selectedFlight={selectedFlight}
        selectedSeats={selectedSeats}
        passengerDetails={passengerDetails}
        closeModal={closeModal}
        navigateToSearch={onNavigateToSearch}
      />
    </Container>
  )
}
