import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {ResortItemsResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const resortRelatedQuery = async ({queryKey: [_, resortId], pageParam, signal}: QueryFunctionContext<[string, string?]>) => {
  if (resortId) {
    return await simpleAxios
      .get<ResortItemsResponseType>(endPoints.resort.detail.related(resortId) + `?page=${pageParam ?? 0}`, {
        signal,
      })
      .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
  }
}
