import {endPoints} from 'src/shared/constants'
import {GoogleLoginResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const loginByGoogleMutation = async () => {
  return simpleAxios.get<GoogleLoginResponseType>(endPoints.member.loginByGoogle).then((data) => data.data.data?.result)
}
