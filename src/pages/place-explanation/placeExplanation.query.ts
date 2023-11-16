import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {ResortItemResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const resortInfoQuery = async ({queryKey: [_, resortId], signal}: QueryFunctionContext<[string, string]>) => {
  if (resortId) {
    return await simpleAxios
      .get<ResortItemResponseType>(endPoints.resort.detail.self(resortId), {
        signal,
      })
      .then((response) => response.data.data?.result)
  } else {
    return undefined
  }
}
