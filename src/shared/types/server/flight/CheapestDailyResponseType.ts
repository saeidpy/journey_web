import {BaseResponseType} from '../BaseResponseType'

export type CheapestDailyItem = {
  base: number
  service_tax: number
  total: number
}

export type CheapestDailyResponse = {
  [key: string]: CheapestDailyItem | null
}

export type CheapestDailyResponseType = BaseResponseType<CheapestDailyResponse>
