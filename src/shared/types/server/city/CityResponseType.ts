import {BaseResponseType} from '../BaseResponseType'
import {LocationCityResponse} from '../shared/LocationCityResponse'

export type CityIdType = number | undefined
export type CityResponseType = BaseResponseType<LocationCityResponse>
export type CitiesResponseType = BaseResponseType<LocationCityResponse[]>
