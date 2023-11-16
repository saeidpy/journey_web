import {endPoints} from 'src/shared/constants'
import {AuthResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'
export const resultByGoogleMutation = async ({random_hash}: {random_hash: string}) => {
  return simpleAxios.get<AuthResponseType>(`${endPoints.member.token}?random_hash=${random_hash}`).then((res) => res.data.data?.result)
}
