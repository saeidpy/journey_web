import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType, LocationCityResponse} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const getCitiesByProvinceIdQuery = async ({queryKey: [_, provinceId], signal}: QueryFunctionContext<[string, string]>) => {
  return await simpleAxios
    .get<BaseResponseType<LocationCityResponse[]>>(endPoints.province.detail(provinceId), {
      signal,
    })
    .then((response) => response?.data.data?.result)
}
