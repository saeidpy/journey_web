import {endPoints} from 'src/shared/constants'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const deleteCommentMutation = async ({commentId}: {commentId: string}) => {
  return await axiosWithAuth.delete(endPoints.resort.comment.delete(commentId)).then((response) => response.data.data.result)
}
