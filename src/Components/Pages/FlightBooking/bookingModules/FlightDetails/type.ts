import { TFlight, TSeat } from 'src/Redux/features/flightsSlice/types'

export type TFlightDetails = {
  flight: TFlight
  selectedSeats: Array<TSeat>
}
