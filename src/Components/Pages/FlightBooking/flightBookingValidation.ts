import { TSeat } from 'src/Redux/features/flightsSlice/types'
import { TValidationErrors } from '../FlightSearch/type'
import { TPassengersDetails } from './bookingModules/type'

export const validateFlightBooking = ({
  selectedSeats,
  name,
  surname,
  email,
  phone,
}: {
  selectedSeats: Array<TSeat>
} & TPassengersDetails): TValidationErrors => {
  const errors: TValidationErrors = {
    selectedSeats:
      selectedSeats.length === 0 ? 'Required to choose a seat' : '',
    name: /^[a-zA-Z]+$/.test(name)
      ? ''
      : 'The field is required. Must contain only letters',
    surname: /^[a-zA-Z]+$/.test(surname)
      ? ''
      : 'The field is required. Must contain only letters',
    email: /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/.test(email)
      ? ''
      : 'The field is required. Invalid email format',
    phone: /^\+\d+$/.test(phone)
      ? ''
      : 'The field is required. Phone number must start with a plus sign',
  }

  return errors
}
