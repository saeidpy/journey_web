import {endPoints, servers} from 'src/shared/constants'
import {SetPasswordRequestType, SetPasswordResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const setPasswordMutation = async ({member_id, password, token}: SetPasswordRequestType) => {
  if (servers.withMock) {
    return new Promise<SetPasswordResponseType>((resolve) => {
      window.setTimeout(() => {
        resolve({
          data: {
            result: {
              description: null,
              cover_picture: null,
              resort_pic_by_me: null,
              email: null,
              living_city: null,
              living_city_id: null,
              member_id,
              name: null,
              password: null,
              phone_number: null,
              profile_picture: null,
              profile_picture_id: null,
              score: null,
              user_name: null,
            },
          },
        } as SetPasswordResponseType)
      }, 3000)
    })
  } else {
    return simpleAxios
      .post<SetPasswordResponseType>(
        endPoints.member.password(member_id.toString()),
        {password},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data.data?.result)
  }
}
