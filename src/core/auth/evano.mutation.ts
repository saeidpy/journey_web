import {AxiosInstance} from 'axios'
import {endPoints} from 'src/shared/constants'

export const evanoMutation = async (axios: AxiosInstance, id: string) => {
  return axios.get(endPoints.member.loginByEvano(id)).then((res) => res.data?.result)
}
