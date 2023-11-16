import {UserContextValue} from 'src/core/auth'
import {BookFlightValue} from 'src/core/book-flight/useBookFlight'
import {BookHotelValueType} from 'src/core/book-hotel/useBookHotel'
import {StorageKeys} from 'src/shared/constants'

type AuthDataType = Omit<UserContextValue, 'setAuth' | 'setUser'>

function getStorageObject<ReturnType extends Object = never>(key: StorageKeys) {
  const returnDataString = localStorage.getItem(key)
  if (returnDataString) {
    try {
      return JSON.parse(returnDataString) as ReturnType
    } catch (_) {}
  }
}

function setStorageObject<ObjectType extends Object>(key: StorageKeys, obj?: ObjectType) {
  if (obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  } else {
    localStorage.removeItem(key)
  }
}

export const getAuthData = () => getStorageObject<AuthDataType>(StorageKeys.authData)

export const setAuthData = (authData?: AuthDataType) => setStorageObject(StorageKeys.authData, authData)

export const getBookFlightData = () => {
  const obj = getStorageObject<BookFlightValue>(StorageKeys.bookFlightData)
  if (obj?.departureDate) {
    obj.departureDate = new Date(obj.departureDate)
  }
  if (obj?.returnDate) {
    obj.returnDate = new Date(obj.returnDate)
  }
  return obj
}

export const setBookFlightData = (bookFlightData?: BookFlightValue) => setStorageObject(StorageKeys.bookFlightData, bookFlightData)

export const getBookHotelData = () => {
  const obj = getStorageObject<BookHotelValueType>(StorageKeys.bookHotelData)
  return obj
}

export const setBookHotelData = (bookHotelData?: BookHotelValueType) => setStorageObject(StorageKeys.bookHotelData, bookHotelData)
