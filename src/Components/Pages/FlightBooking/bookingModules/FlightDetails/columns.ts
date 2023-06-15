import { TTableColumn } from 'src/Components/Generics/Table/type'

export const columns: Array<TTableColumn> = [
  { label: 'From', property: 'from' },
  { label: 'To', property: 'to' },
  { label: 'Departure', property: 'departure' },
  { label: 'Arrival', property: 'arrival' },
  { label: 'Duration', property: 'duration' },
  { label: 'Price', property: 'price', dynamic: true },
]
