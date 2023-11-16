import {GeoPointResponse} from './GeoPointResponse'

export interface LocationGeoPointProvinceResponse {
  created_at: Date | string
  geo_point: GeoPointResponse
  id: number
  normalized_province_name: string
  province_name_en: string
  province_name_fa: string
}
