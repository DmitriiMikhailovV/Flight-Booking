import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { InputField } from 'src/Components/Generics'
import { TPassengerDetails } from './type'

const passengerFields = [
  { field: 'name', label: 'Name' },
  { field: 'surname', label: 'Surname' },
  { field: 'email', label: 'Email' },
  { field: 'phone', label: 'Phone', phoneNumber: true },
]

export const PassengerDetails: FC<TPassengerDetails> = ({
  passengerDetails,
  handleInputChange,
  validationErrors,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
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
      {passengerFields.map(({ field, label, phoneNumber }) => (
        <InputField
          key={field}
          field={field}
          label={label}
          value={passengerDetails[field as keyof typeof passengerDetails]}
          onChange={handleInputChange}
          validationError={validationErrors[field]}
          phoneNumber={phoneNumber}
        />
      ))}
    </Box>
  )
}
