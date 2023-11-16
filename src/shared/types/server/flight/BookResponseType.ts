import {BaseResponseType} from '../BaseResponseType'

export type BookResponse = {
  Category: number
  Error: string
  PriceChange: boolean
  Status: number
  Success: boolean
  TktTimeLimit: Date | string
  UniqueId: string
}

export type BookResponseType = BaseResponseType<BookResponse>
