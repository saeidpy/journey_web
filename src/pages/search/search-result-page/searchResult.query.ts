import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType, SearchResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'
//@ts-ignore
export const searchResultQuery = async ({queryKey: [_, searchTerm, filter], pageParam, signal}: QueryFunctionContext<[string, string]>) => {
  return await simpleAxios
    .get<BaseResponseType<SearchResponseType[]>>(endPoints.search.query.term(searchTerm, filter), {
      params: {
        fill_entity: true,
        page: pageParam ?? 0,
      },
      signal,
    })
    .then((res) => (res.data.data ? {...res.data.data, count: res.data.data.result.length, page: pageParam} : undefined))
}
