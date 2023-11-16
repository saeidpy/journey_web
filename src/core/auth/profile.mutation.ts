import {AxiosInstance} from 'axios'
import {endPoints} from 'src/shared/constants'
import {ProfileResponseType} from 'src/shared/types/server'

export const profileMutation = async (axios: AxiosInstance) => {
  return axios.get<ProfileResponseType>(endPoints.member.profile.self).then((res) => res.data.data?.result)
}
