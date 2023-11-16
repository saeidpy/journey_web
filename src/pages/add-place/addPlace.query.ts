import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const resortFilterQuery = async ({queryKey: [_, resortFilterName], signal}: QueryFunctionContext<[string, string]>) => {
  return await simpleAxios
    .get<BaseResponseType<[string, string]>>(endPoints.resort.detail.filter(resortFilterName), {
      signal,
    })
    .then((response) => response?.data.data?.result)
}
