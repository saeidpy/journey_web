import {GeoPointResponse} from './GeoPointResponse'
import {LocationGeoPointCityResponse} from './LocationGeoPointCityResponse'

export interface LocationGeoPointResponse {
  city: LocationGeoPointCityResponse
  geo_point: LocationGeoPointResponse | GeoPointResponse
  location_id: number
}
