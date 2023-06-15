import { TFlightFilter } from 'src/Redux/features/flightsSlice/types'
import { TValidationErrors } from './type'

export const validateFlightSearch = ({
  from,
  to,
  departure,
  arrival,
  duration,
  price,
}: TFlightFilter): TValidationErrors => {
  const errors: TValidationErrors = {
    from:
      /^[a-zA-Z\s]+$/.test(from) || from === ''
        ? ''
        : 'Must contain only letters or empty',
    to:
      /^[a-zA-Z\s]+$/.test(to) || to === ''
        ? ''
        : 'Must contain only letters or empty',
    departure:
      departure.startDate &&
      departure.endDate &&
      departure.startDate > departure.endDate
        ? 'Start date should be before end date'
        : '',
    arrival:
      arrival.startDate &&
      arrival.endDate &&
      arrival.startDate > arrival.endDate
        ? 'Start date should be before end date'
        : '',
    duration:
      duration.min > duration.max
        ? 'Min duration should be less than max duration'
        : '',
    price:
      price.min > price.max ? 'Min price should be less than max price' : '',
  }

  return errors
}
