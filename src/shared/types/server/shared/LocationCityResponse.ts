import {GeoPointResponse} from './GeoPointResponse'
import {LocationProvinceResponse} from './LocationProvinceResponse'
import {MediaResponse} from './MediaResponse'

export interface LocationCityResponse {
  city_id: number | null
  city_name_en: string
  city_name_fa: string
  description: string
  geo_point: GeoPointResponse
  media_list: MediaResponse[]
  normalized_name_fa: string
  province: LocationProvinceResponse
  visited_count: number
}
