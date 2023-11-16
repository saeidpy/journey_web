import {PointResponse} from './points/PointResponseType'

type BaseResponseDataType<T> = T extends Array<unknown>
  ? {
      count: number
      result: T
      badge_list?: PointResponse[]
      has_next?: boolean
    }
  : {
      result: T
      badge_list?: PointResponse[]
    }

interface BaseExceptionType<T> {
  data?: BaseResponseDataType<T>
  exact_exception?: null
  message?: string
}

export type BaseResponseType<Data extends {} | Array<unknown> = never> = BaseExceptionType<Data>
