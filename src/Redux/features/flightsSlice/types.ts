export type TFetchFlights = {
  flights: Array<TFlight>
  loadingFlights: boolean
  errorFlights: string
  flightFilter: TFlightFilter
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

export type TFlightFilter = {
  from: string
  to: string
  departure: TStartEndDate
  arrival: TStartEndDate
  duration: TMinMax
  price: TMinMax
  [key: string]: string | number | TMinMax | TStartEndDate
}

export type TMinMax = {
  min: number
  max: number
}

export type TStartEndDate = {
  startDate: number
  endDate: number
}
