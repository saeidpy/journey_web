import {LocationResponse} from '../shared/LocationResponse'
import {BaseResponseType} from './../BaseResponseType'
import {StationType} from './TicketResponseType'

export interface AirportMostVisitedItem {
  code: string
  location: LocationResponse
  name_en: string
  name_fa: string
  station_id: null
  station_type: StationType
  visited_count: number
}

export type AirportMostVisitedResponseType = BaseResponseType<AirportMostVisitedItem[]>
