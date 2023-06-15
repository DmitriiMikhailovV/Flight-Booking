import { TFlight, TSeat } from 'src/Redux/features/flightsSlice/types'

export type TBookingConfirmationModal = {
  isModalOpen: boolean
  selectedFlight: TFlight | null
  selectedSeats: Array<TSeat>
  passengerDetails: {
    name: string
    surname: string
    email: string
    phone: string
  }
  closeModal: () => void
  navigateToSearch: () => void
}
