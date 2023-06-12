import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchMockData } from 'src/fakeFetch'
import { convertToUnixTimestamp, parseDuration } from 'src/helpers'
import type { TFetchFlights, TFlightSlice } from './types'

const initialState: TFetchFlights = {
  flights: [],
  filteredFlights: [],
  loadingFlights: false,
  errorFlights: '',
}

export const fetchFlights = createAsyncThunk<
  TFlightSlice,
  void,
  { rejectValue: string }
>('flight/fetchFlights', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchMockData(
      'https://booking.com/api/bookingFlight'
    )
    const data: TFlightSlice = response.data
    return { flights: data.flights }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred.')
  }
})

export const flightSlice = createSlice({
  name: 'flightSlice',
  initialState,
  reducers: {
    updateFilteredFlights: (state, action) => {
      const { arrival, departure, from, to, duration, price } = action.payload
      const { startDate: arrivalStartDate, endDate: arrivalEndDate } = arrival
      const { startDate: departureStartDate, endDate: departureEndDate } =
        departure

      const filteredFlights = state.flights.filter((flight) => {
        const parsedDuration = parseDuration(flight.duration)
        const isWithinArrivalDateRange =
          (arrivalStartDate === null ||
            convertToUnixTimestamp(flight.arrival) >= arrivalStartDate) &&
          (arrivalEndDate === null ||
            convertToUnixTimestamp(flight.arrival) <= arrivalEndDate)

        const isWithinDepartureDateRange =
          (departureStartDate === null ||
            convertToUnixTimestamp(flight.departure) >= departureStartDate) &&
          (departureEndDate === null ||
            convertToUnixTimestamp(flight.departure) <= departureEndDate)

        return (
          flight.from.toLowerCase().includes(from.toLowerCase()) &&
          flight.to.toLowerCase().includes(to.toLowerCase()) &&
          parsedDuration >= duration.min &&
          parsedDuration <= duration.max &&
          flight.price >= price.min &&
          flight.price <= price.max &&
          isWithinArrivalDateRange &&
          isWithinDepartureDateRange
        )
      })

      return {
        ...state,
        filteredFlights,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        return {
          ...state,
          loadingFlights: true,
          errorFlights: '',
        }
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        return {
          ...state,
          loadingFlights: false,
          flights: action.payload.flights,
          errorFlights: '',
        }
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        return {
          ...state,
          loadingFlights: false,
          flights: [],
          errorFlights: action.error.message as string,
        }
      })
  },
})

export const { updateFilteredFlights } = flightSlice.actions
