import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {CityResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const cityInfoQuery = async ({queryKey: [_, cityId], signal}: QueryFunctionContext<['CityInfo', string]>) => {
  return typeof cityId === 'undefined'
    ? Promise.reject(new Error('Invalid id'))
    : await simpleAxios
        .get<CityResponseType>(endPoints.province.city.detail(cityId), {signal})
        .then((response) => response.data.data?.result)
}
