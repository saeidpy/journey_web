import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType, LocationProvinceResponse} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const getProvincesQuery = async ({queryKey: [_], signal}: QueryFunctionContext<[string]>) => {
  return await simpleAxios
    .get<BaseResponseType<LocationProvinceResponse[]>>(endPoints.province.self, {
      signal,
    })
    .then((response) => response?.data.data?.result)
}
