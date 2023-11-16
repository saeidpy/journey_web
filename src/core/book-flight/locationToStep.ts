import {BookFlightSteps} from './useBookFlight'

export const locationToStep = (location: string): BookFlightSteps => {
  const locationWithoutFlight = location.split('/flight/')[1]
  if (locationWithoutFlight) {
    if (locationWithoutFlight.startsWith('search-flight-result')) {
      return 'first-search'
    } else if (locationWithoutFlight.startsWith('flight-information')) {
      return 'ticket-confirmation'
    } else if (locationWithoutFlight.startsWith('return-flight-information')) {
      return 'return-ticket-confirmation'
    } else if (locationWithoutFlight.startsWith('passengers-info')) {
      return 'passengers-form'
    } else if (locationWithoutFlight.startsWith('final')) {
      return 'final-check'
    } else if (locationWithoutFlight.startsWith('payment')) {
      return 'payment'
    }
  }
  return 'search-form'
}
