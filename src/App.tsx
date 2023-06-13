import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { FlightBooking, FlightSearch } from './Components/Pages'

const theme = createTheme()

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/search" element={<FlightSearch />} />
        <Route path="/booking/:id" element={<FlightBooking />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </ThemeProvider>
  )
}
