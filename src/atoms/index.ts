import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {BookFlightValue} from 'src/core/book-flight/useBookFlight'
import {BookHotelValueType} from 'src/core/book-hotel/useBookHotel'
import {FlightType, HotelOrCityType} from 'src/shared/types/server'
import {addDaysDate, dateApiFormat} from 'src/shared/utils/jalaliDate'
export const defaultBookHotelAtom: BookHotelValueType = {
  sessionId: '',
  destination: {label: '', value: null, type: HotelOrCityType.hotel},
  rangeDate: [dateApiFormat() /*Get today date */, dateApiFormat(addDaysDate(1)) /*Get tomorrow date */],
  count: [],
  passengers: [],
}
export interface OpenModalProps {
  content: React.ReactNode
  title: string
  actionHeaderEl?: React.ReactNode
  zeroPadding?: boolean
}
export interface ModalType {
  id: string
  options: OpenModalProps
}

export const defaultBookFlightAtom: BookFlightValue = {
  src: {
    label: '',
    value: null,
  },
  dest: {
    label: '',
    value: null,
  },
  type: FlightType.DOMESTIC,
  isOneWay: true,
  adultCount: 0,
  childCount: 0,
  infantCount: 0,
  passengers: [],
  passengersInput: [],
  returnDate: null,
  departureDate: null,
}
export const bookHotelAtom = atomWithStorage('book-hotel-atom', defaultBookHotelAtom)
bookHotelAtom.debugLabel = 'bookHotelAtom'

export const bookFlightAtom = atomWithStorage('book-flight-atom', defaultBookFlightAtom)
bookFlightAtom.debugLabel = 'bookFlightAtom'

// export const defaultScrollBasedInfiniteQueryAtom = atom<UseInfiniteQueryResult<unknown, unknown> | null>(
//   null
// );
export const modalAtom = atom<ModalType | undefined>(undefined)

export const errorAtom = atom<{error: Error | null; reset: () => void}>({
  error: null,
  reset: () => {},
})
