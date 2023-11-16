import {endPoints} from 'src/shared/constants'
import {BaseResponseType, LikeOrDislikeCommentRequestType, SearchResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const likeOrDislikeCommentMutation = async ({commentId, data}: {commentId: string; data: LikeOrDislikeCommentRequestType}) => {
  return await axiosWithAuth
    .post<BaseResponseType<SearchResponseType[]>>(endPoints.resort.comment.impression.new(commentId), data)
    .then((response) => response.data.data)
}
