import {QueryFunctionContext, QueryKey} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType, PointResponse} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const medalGuideQuery = (params: QueryFunctionContext<QueryKey>) => {
  return simpleAxios
    .get<BaseResponseType<PointResponse[]>>(endPoints.member.badge.guidance, {signal: params.signal})
    .then((res) => res.data.data?.result)
}
