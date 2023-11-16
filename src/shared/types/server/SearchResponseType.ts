import {ResortResponseItem} from './resort/ResortItemResponseType'
import {LocationCityResponse} from './shared/LocationCityResponse'

export interface SearchResponseType {
  entity: ResortResponseItem | LocationCityResponse | null
  entity_type: [SearchEntityTypeEnum, [SearchEntityTypeEnum]]
  // entity_type: SearchEntityTypeEnum
  id: number
  result_text: string
  search_text: string
}

export enum SearchEntityTypeEnum {
  RESTAURANT = 'restaurant',
  RESIDENCE = 'residence',
  TOURISM_ENTITY = 'tourism_entity',
  CITY = 'city',
}
