import React, { FC } from 'react'
import { Button as MUIButton } from '@mui/material'
import { TButton } from './type'

export const Button: FC<TButton> = ({ label, onClick }) => {
  return (
    <MUIButton variant="contained" color="primary" onClick={onClick}>
      {label}
    </MUIButton>
  )
}
