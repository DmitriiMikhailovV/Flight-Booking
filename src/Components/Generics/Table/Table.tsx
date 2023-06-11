import { FC } from 'react'
import {
  Paper,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  Table as MUITable,
} from '@mui/material'

import { TTable } from './type'

export const Table: FC<TTable> = ({ columns, data }) => {
  return data.length > 0 ? (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex}>
                  {row[column.property] as string}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  ) : null
}
