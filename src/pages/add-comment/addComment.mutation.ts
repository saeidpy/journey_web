import {endPoints} from 'src/shared/constants'
import {AddCommentRequestType, BaseResponseType, CommentResponse} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const addCommentMutation = async ({data}: {data: AddCommentRequestType}) => {
  return axiosWithAuth
    .put<BaseResponseType<CommentResponse>>(endPoints.resort.detail.comment.new(data.resortId), data.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data.data)
}
