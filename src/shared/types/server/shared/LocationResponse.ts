import {GeoPointResponse} from './GeoPointResponse'
import {LocationCityResponse} from './LocationCityResponse'
import {LocationGeoPointResponse} from './LocationGeoPointResponse'

export interface LocationResponse {
  area: null
  city: LocationCityResponse
  created_at: Date | string
  geo_point: LocationGeoPointResponse | GeoPointResponse
  location_id: number
  street: null
}
