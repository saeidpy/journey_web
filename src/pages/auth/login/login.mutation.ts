import {endPoints} from 'src/shared/constants'
import {LoginResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const loginMutation = async (input_text: string) => {
  return simpleAxios.post<LoginResponseType>(endPoints.member.verify, {input_text}).then((res) => res.data.data?.result)
}
