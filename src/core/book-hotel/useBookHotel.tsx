import {useAtom} from 'jotai'
import {useCallback} from 'react'
import {bookHotelAtom} from 'src/atoms'
import {HotelOrCityType} from 'src/shared/types/server'

export type PassengerRoomType = {
  adult: number
  child: number
  childAge: number[]
}

export type SelectedRoom = {
  passengerCount: number
  roomName: string
  hotelName: string
  pricePerNight: number
  facilities: string[]
  nightsCount: number
  address: string
  fare_source_code?: string
}

export type PassengerType = {
  fullName: string
  gender: string
  nationalCode: string
}

export type PassengerInputType = {
  adult: PassengerType[]
  child: PassengerType[]
}

export type BookHotelValueType = {
  sessionId?: string
  destination?: {label: string; value: string | null; type?: HotelOrCityType}
  rangeDate?: [string, string]
  count?: PassengerRoomType[]
  selectedRoom?: SelectedRoom
  passengers?: PassengerInputType[]
}

export function useBookHotel() {
  const [bookHotel, _setBookHotel] = useAtom(bookHotelAtom)

  const setBookHotel = useCallback((arg: BookHotelValueType) => _setBookHotel((bookHotel) => ({...bookHotel, ...arg})), [_setBookHotel])
  return {bookHotel, setBookHotel}
}
