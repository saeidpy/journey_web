import {GeoPointResponse} from './GeoPointResponse'

export interface LocationProvinceResponse {
  geo_point: GeoPointResponse
  normalized_province_name_fa: string
  province_id: number
  province_name_en: string
  province_name_fa: string
  visited_count: number
}
