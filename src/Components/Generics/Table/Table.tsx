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

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
}: TTable<T>) => {
  return data.length > 0 ? (
    <TableContainer component={Paper} sx={{ marginBottom: '16px' }}>
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
            <TableRow
              sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
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
