import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {CommentResponseType} from 'src/shared/types/server'
import {axiosWithAuth, simpleAxios} from 'src/shared/utils/axios'

export const resortCommentQuery = async ({
  queryKey: [_, isUserAuthorized, resortId],
  pageParam,
  signal,
}: QueryFunctionContext<[string, boolean, string?]>) => {
  if (resortId) {
    if (isUserAuthorized) {
      return await axiosWithAuth
        .get<CommentResponseType>(endPoints.resort.detail.comment.self(resortId) + `?page=${pageParam ?? 0}`, {
          signal,
        })
        .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
    } else {
      return await simpleAxios
        .get<CommentResponseType>(endPoints.resort.detail.comment.self(resortId) + `?page=${pageParam ?? 0}`, {
          signal,
        })
        .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
    }
  }
}
