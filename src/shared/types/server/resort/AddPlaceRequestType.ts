import {ResortTypeEnum} from './ResortItemResponseType'

export type AddPlaceDataToPostType = {
  name_fa: string
  description: string
  resort_type: ResortTypeEnum
  resort_filter: string
  tags: string[]
  city_name: string
  province_name: string
  longitude: number
  latitude: number
}
