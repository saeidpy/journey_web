import {endPoints} from 'src/shared/constants'
import {BaseResponseType, SearchResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const searchMutation = async ({searchTerm, filter, signal}: {searchTerm: string; filter: string; signal: AbortSignal}) => {
  return await simpleAxios
    .get<BaseResponseType<SearchResponseType[]>>(endPoints.search.query.term(searchTerm), {
      params: filter ? {filter} : {},
      signal,
    })
    .then((response) => response.data.data?.result)
}
