import {QueryFunctionContext, QueryKey} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {ResortResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const homePageQuery = async (params: QueryFunctionContext<QueryKey, number | undefined>) => {
  const res = await simpleAxios?.get<ResortResponseType>(`${endPoints.resort.self}?page=${params.pageParam ?? 0}`, {signal: params.signal})
  return res.data.data ? {...res.data.data, page: params.pageParam} : undefined
}
