import {GeoPointResponse} from './GeoPointResponse'
import {LocationGeoPointProvinceResponse} from './LocationGeoPointProvinceResponse'

export interface LocationGeoPointCityResponse {
  city_name_en: string
  city_name_fa: string
  created_at: Date | string
  geo_point: GeoPointResponse
  id: number
  normalized_city_name: string
  province: LocationGeoPointProvinceResponse
}
