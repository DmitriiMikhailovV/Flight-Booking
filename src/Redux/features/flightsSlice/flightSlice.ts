import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchMockData } from 'src/fakeFetch'
import type { TFetchFlights, TFlightSlice } from './types'

export const dateToUnix = (date: Date) => {
  return Math.round(date.getTime() / 1000)
}

export const unixToDate = (unixTimestamp: number) =>
  new Date(unixTimestamp * 1000)

const initialState: TFetchFlights = {
  flights: [],
  loadingFlights: false,
  errorFlights: '',
  flightFilter: {
    from: '',
    to: '',
    departure: {
      startDate: dateToUnix(new Date()),
      endDate: dateToUnix(new Date()),
    },
    arrival: {
      startDate: dateToUnix(new Date()),
      endDate: dateToUnix(new Date()),
    },
    duration: { min: 0, max: 24 },
    price: { min: 0, max: 1000 },
  },
}

export const fetchFlights = createAsyncThunk<
  TFlightSlice,
  void,
  { rejectValue: string }
>('flight/fetchFlights', async (_, { rejectWithValue }) => {
  try {
    // with real api request
    // const response = await axios.get('https://booking.com/api/bookingFlight')
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
    setFilter: (state, action) => {
      return {
        ...state,
        flightFilter: { ...state.flightFilter, ...action.payload },
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFlights.pending, (state) => {
      return { ...state, loadingFlights: true, errorFlights: '' }
    })
    builder.addCase(fetchFlights.fulfilled, (state, action) => {
      return {
        ...state,
        loadingFlights: false,
        flights: action.payload.flights,
        errorFlights: '',
      }
    })
    builder.addCase(fetchFlights.rejected, (state, action) => {
      return {
        ...state,
        loadingFlights: false,
        flights: [],
        errorFlights: action.error.message as string,
      }
    })
  },
})

export const { setFilter } = flightSlice.actions
