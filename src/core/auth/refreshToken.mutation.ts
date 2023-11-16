import {endPoints} from 'src/shared/constants'
import {RefreshTokenResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const refreshTokenMutation = async (refreshToken: string) => {
  return simpleAxios
    .post<RefreshTokenResponseType>(endPoints.member.refresh, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((res) => res.data.data?.result)
}
