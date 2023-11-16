import {BaseResponseType} from '../BaseResponseType'
import {StationType} from './TicketResponseType'

export interface SearchAirportItem {
  entity: null
  entity_type: StationType
  id: string
  result_text: string
  search_text: string
}

export type SearchAirportResponseType = BaseResponseType<SearchAirportItem[]>
