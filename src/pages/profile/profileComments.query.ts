import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {CommentResponseType} from 'src/shared/types/server'
import {axiosWithAuth, simpleAxios} from 'src/shared/utils/axios'

export const profileCommentsQuery = ({queryKey: [_, id], pageParam, signal}: QueryFunctionContext<[string, string]>) => {
  return id === ''
    ? axiosWithAuth
        .get<CommentResponseType>(`${endPoints.member.comments.list}?page=${pageParam ?? 0}`, {
          signal,
        })
        .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
    : simpleAxios
        .get<CommentResponseType>(`${endPoints.member.comments.getOthers(id)}?page=${pageParam ?? 0}`, {
          signal,
        })
        .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
}
