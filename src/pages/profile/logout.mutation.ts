import {endPoints} from 'src/shared/constants'
import {BaseResponseType, CommentResponse} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const logoutMutation = async () => {
  return axiosWithAuth.delete<BaseResponseType<CommentResponse>>(endPoints.member.logout).then((res) => res.data.data?.result)
}
