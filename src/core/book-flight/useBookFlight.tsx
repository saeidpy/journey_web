import {useAtom} from 'jotai'
import {useCallback} from 'react'
import {bookFlightAtom} from 'src/atoms'
import {FlightPassengerInputs} from 'src/shared/flight-ticket-info'
import {AgeType, FlightType, Ticket} from 'src/shared/types/server'

export interface FlightSearchInput {
  value: string | null
  label: string
}

export type BookFlightSteps =
  | 'search-form'
  | 'first-search'
  | 'ticket-confirmation'
  | 'return-ticket-confirmation'
  | 'passengers-form'
  | 'final-check'
  | 'payment'

type BookFlightPassengerPassportOrNationalId =
  | {
      nationalCard: true
      nationalId: string
      passportId?: never
      passportIssued?: never
      passportExpiryDate?: never
      nationality?: never
    }
  | {
      nationalCard: false
      nationalId?: never
      passportId: string
      passportIssued: string
      passportExpiryDate: string
      nationality: [string, string]
    }

export type BookFlightPassenger = {
  ageType: AgeType
  birthday: string
  gender: [string, number]
  firstName: string
  lastName: string
} & BookFlightPassengerPassportOrNationalId

export type BookFlightValue = {
  sessionId?: string
  src: FlightSearchInput
  dest: FlightSearchInput
  type: FlightType
  departureDate: Date | null
  selectedTicket?: Ticket
  adultCount: number
  childCount: number
  infantCount: number
  passengers: BookFlightPassenger[]
  passengersInput: FlightPassengerInputs[]
  isOneWay: boolean
  returnDate: Date | null
  onNextStep?: React.MutableRefObject<(() => Promise<boolean>) | undefined>
}
export function useBookFlight() {
  const [bookFlight, _setBookFlight] = useAtom(bookFlightAtom)

  const setBookFlight = useCallback(
    (arg: Partial<BookFlightValue>) => _setBookFlight((bookFlight) => ({...bookFlight, ...arg})),
    [_setBookFlight]
  )
  return {bookFlight, setBookFlight}
}
