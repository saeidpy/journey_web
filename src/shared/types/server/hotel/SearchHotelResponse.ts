import {BaseResponseType} from '../BaseResponseType'
import {HotelOrCityType} from './HotelResponseType'

export interface SearchHotelItem {
  entity: null
  entity_type: HotelOrCityType
  id: string
  result_text: string
  search_text: string
}

export type SearchHotelResponseType = BaseResponseType<SearchHotelItem[]>
