import {endPoints} from 'src/shared/constants'
import {OTPRequestType, OTPResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const otpMutation = async ({verification_code, email, phone_number}: OTPRequestType) => {
  return simpleAxios
    .post<OTPResponseType>(endPoints.member.register, {verification_code, email, phone_number})
    .then((res) => res.data.data?.result)
}
