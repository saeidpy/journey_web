import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {ResortResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const cityAttractionsQuery = ({
  queryKey: [_, cityId, resortType],
  pageParam,
  signal,
}: QueryFunctionContext<[string, string, string]>) => {
  return simpleAxios
    ?.get<ResortResponseType>(endPoints.resort.detail.type(resortType), {
      params: {
        ...(cityId ? {city_id: cityId} : {}),
        page: pageParam ?? 0,
      },
      signal: signal,
    })
    .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
}
