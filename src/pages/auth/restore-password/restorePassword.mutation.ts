import {endPoints, servers} from 'src/shared/constants'
import {RestorePasswordRequestType, RestorePasswordResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const restorePasswordMutation = async ({email}: RestorePasswordRequestType) => {
  if (servers.withMock) {
    return new Promise<RestorePasswordResponseType>((resolve) => {
      window.setTimeout(() => {
        resolve({
          data: {
            result: {
              description: null,
              cover_picture: null,
              resort_pic_by_me: null,
              email,
              living_city: null,
              living_city_id: null,
              member_id: null,
              name: null,
              password: null,
              phone_number: null,
              profile_picture: null,
              profile_picture_id: null,
              score: null,
              user_name: null,
            },
          },
        } as RestorePasswordResponseType)
      }, 3000)
    })
  } else {
    return simpleAxios.post<RestorePasswordResponseType>(endPoints.member.restore.password, {email}).then((res) => res.data.data?.result)
  }
}
