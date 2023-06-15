import { TValidationErrors } from 'src/Components/Pages/FlightSearch/type'
import { TFlight, TSeat } from 'src/Redux/features/flightsSlice/types'

export type TSeatSelection = {
  selectedFlight: TFlight
  selectedSeats: Array<TSeat>
  handleSeatClick: (seat: TSeat) => void
  validationErrors: TValidationErrors
}
