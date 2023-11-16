import type {LocationCityResponse, LocationProvinceResponse} from 'src/shared/types/server'

export type ProvinceCityInputType = {
  city: LocationCityResponse | null
  province: LocationProvinceResponse | null
}

export type InputProps = {
  required?: boolean
}
