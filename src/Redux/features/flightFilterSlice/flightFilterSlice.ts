import { createSlice } from '@reduxjs/toolkit'
import { TFlightFilterSlice } from './types'

const initialState: TFlightFilterSlice = {
  from: '',
  to: '',
  departure: '',
  arrival: '',
  duration: '',
  price: 0,
}

export const flightFilterSlice = createSlice({
  name: 'flightFilter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setFilter } = flightFilterSlice.actions
