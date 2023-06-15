import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { InputField } from 'src/Components/Generics'
import { TPassengerDetails } from './type'

export const PassengerDetails: FC<TPassengerDetails> = ({
  passengerDetails,
  handleInputChange,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '16px',
        gap: '16px',
        flexDirection: 'column',
        width: '100%',
        minWidth: '250px',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Passenger Details
      </Typography>
      <InputField
        field="name"
        label="Name"
        value={passengerDetails.name}
        onChange={handleInputChange}
        validationError={''}
        onlyText
      />
      <InputField
        field="surname"
        label="Surname"
        value={passengerDetails.surname}
        onChange={handleInputChange}
        validationError={''}
        onlyText
      />
      <InputField
        field="email"
        label="Email"
        value={passengerDetails.email}
        onChange={handleInputChange}
        validationError={''}
      />
      <InputField
        field="phone"
        label="Phone"
        value={passengerDetails.phone}
        onChange={handleInputChange}
        validationError={''}
        phoneNumber
      />
    </Box>
  )
}
