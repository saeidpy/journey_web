import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {CitiesResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const mostVisitedQuery = async ({queryKey: _, signal}: QueryFunctionContext<['SearchSection']>) => {
  return await simpleAxios
    .get<CitiesResponseType>(endPoints.province.city.mostvisited, {
      signal,
    })
    .then((response) => response?.data.data?.result)
}
