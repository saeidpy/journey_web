import {BaseResponseType} from '../BaseResponseType'
import {GeoPointResponse} from '../shared/GeoPointResponse'
import {LocationResponse} from '../shared/LocationResponse'
import {MediaResponse} from '../shared/MediaResponse'

export enum ExperienceTypeEnum {
  WORK_RELATED = 'work_related',
  FAMILY = 'familial',
  FRIENDLY = 'friendly',
  SINGLE = 'single',
}

export enum ResortTypeEnum {
  RESTAURANT = 'restaurant',
  RESIDENCE = 'residence',
  TOURISM_ENTITY = 'tourism_entity',
}

export enum PlaceTypeEnum {
  RESTAURANT = 'restaurant',
  RESIDENCE = 'residence',
  TOURISM_ENTITY = 'tourism_entity',
  RESORT = 'RESORT',
}

export enum ResidenceTypeEnum {
  HOTEL = 'hotel',
  SCHOOL = 'school',
  MOTEL = 'motel',
  VILLA = 'villa',
  COTTAGE = 'cottage',
}

export enum TourismEntityCategoryEnum {
  RECREATIONAL = 'recreational',
  HISTORICAL = 'historical',
  NATURAL = 'natural',
}

export enum TourismEntityTypeEnum {
  MUSEUM = 'museum',
  RESTAURANT = 'restaurant',
  WATERFALL = 'waterfall',
  JUNGLE = 'jungle',
  CAVE = 'cave',
  GARDEN = 'garden',
  DESERT = 'desert',
  MOUNTAIN = 'mountain',
  FOUNTAIN = 'fountain',
  RIVER = 'river',
  PLAIN = 'plain',
  VALLEY = 'valley',
  CANYON = 'canyon',
  WETLAND = 'wetland',
  LAKE = 'lake',
  SHRINE = 'shrine',
  CARAVANSARY = 'caravansary',
  MOSQUE = 'mosque',
  BRIDGE = 'bridge',
  TOWER = 'tower',
  PALACE = 'palace',
  INSCRIPTION = 'inscription',
  HOLY_PLACE = 'holy_place',
  CHURCH = 'church',
  BATHROOM = 'bathroom',
  CASTLE = 'castle',
  SCHOOL = 'school',
  MANSION = 'mansion',
  CISTERN = 'cistern',
  BAZAAR = 'bazaar',
  CINEMA = 'cinema',
  POOL = 'pool',
  CULTURAL_CENTER = 'cultural_center',
  SHOPPING_CENTER = 'shopping_center',
  PORT = 'port',
  PARK = 'park',
  CLASSICAL_SPORT_PLACE = 'classical_sport_place',
}

export interface ResortResponseItem {
  category: TourismEntityCategoryEnum
  category_name_fa: string
  base_price: null
  comment_count: number
  comments: []
  creator: null
  description: string
  hash_id: null
  impression_agents: []
  impression_count: null | number
  is_valid: boolean
  location: LocationResponse
  media_count: number
  media_list: MediaResponse[]
  name_en: string
  name_fa: string
  normalized_name: string
  residence_id: number | null
  residence_type: ResidenceTypeEnum
  residence_type_name_fa: string
  resort_id: number
  resort_type: [ResortTypeEnum, string[]]
  resort_type_fa: string
  restaurant_type_name_fa: string
  scores: any[]
  star: number | null
  total_popularity_score: null | number
  tourism_entity_id: null
  tourism_entity_type: TourismEntityTypeEnum
  tourism_entity_type_name_fa: string
  visited_count: number
  has_next?: boolean
}
export interface ReducedResortResponse {
  location: {name: string; geo_point: GeoPointResponse}
  total_popularity_score: number
  comment_count: number
  resort_id: number
  resort_type: string
  media_list: string[]
  name_fa: string
  media_count?: number
  has_next?: boolean
}

export type ResortItemResponseType = BaseResponseType<ResortResponseItem>

export type ResortItemsResponseType = BaseResponseType<ResortResponseItem[]>
