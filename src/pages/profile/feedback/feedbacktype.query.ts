import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const feedbacktype = () => {
  return axiosWithAuth
    .get<BaseResponseType<[string, string][]>>(endPoints.member.profile.feedbackType)
    .then((res) => res.data?.data?.result)
}
