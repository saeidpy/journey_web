import {endPoints} from 'src/shared/constants'
import {addFeedbackType, BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const feedback = (data: addFeedbackType) => {
  return axiosWithAuth.post<BaseResponseType<string>>(endPoints.member.profile.feedback, data).then((res) => res.data.data?.result)
}
