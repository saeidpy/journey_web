import {endPoints} from 'src/shared/constants'
import {BaseResponseType, SearchEntityTypeEnum, SearchResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const searchClickMutation = async ({
  entity_type,
  id,
  result_text,
  search_text,
  signal,
}: {
  entity_type: SearchEntityTypeEnum
  id: string
  result_text: string
  search_text: string
  signal: AbortSignal
}) => {
  return await axiosWithAuth
    .get<BaseResponseType<SearchResponseType[]>>(endPoints.search.click.self, {
      params: {entity_type, id, result_text, search_text},
      signal,
    })
    .then((response) => response.data.data?.result)
}
