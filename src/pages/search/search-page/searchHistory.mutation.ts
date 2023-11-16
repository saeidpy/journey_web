import {endPoints} from 'src/shared/constants'
import {BaseResponseType, SearchResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const searchHistoryMutation = async ({signal}: {signal: AbortSignal}) => {
  return await axiosWithAuth
    .get<BaseResponseType<SearchResponseType[]>>(endPoints.search.history.self, {
      signal,
    })
    .then((response) => response.data.data?.result)
}
