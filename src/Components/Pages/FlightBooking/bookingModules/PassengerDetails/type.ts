import { TValidationErrors } from 'src/Components/Pages/FlightSearch/type'

export type TPassengerDetails = {
  passengerDetails: {
    name: string
    surname: string
    email: string
    phone: string
  }
  handleInputChange: (field: string, value: string) => void
  validationErrors: TValidationErrors
}
