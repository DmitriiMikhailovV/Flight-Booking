export type TFetchFlights = {
  flights: Array<TFlight>
  loadingFlights: boolean
  errorFlights: string
}

export type TFlightSlice = {
  flights: Array<TFlight>
}

export type TFlight = {
  id: number
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  price: number
  seats: Array<TSeat>
}

export type TSeat = {
  id: number
  number: string
  available: boolean
}
