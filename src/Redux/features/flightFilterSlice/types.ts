export type TFlightFilterSlice = {
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  price: number
  [key: string]: string | number
}
