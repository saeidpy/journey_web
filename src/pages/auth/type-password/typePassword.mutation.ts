import {endPoints, servers} from 'src/shared/constants'
import {LoginByPasswordRequestType, LoginByPasswordResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const typePasswordMutation = async ({member_id, password}: LoginByPasswordRequestType) => {
  if (servers.withMock) {
    return new Promise<LoginByPasswordResponseType>((resolve) => {
      window.setTimeout(() => {
        resolve({
          data: {
            result: {
              member: {
                description: null,
                cover_picture: null,
                resort_pic_by_me: null,
                email: null,
                living_city: null,
                living_city_id: null,
                member_id,
                name: null,
                password,
                phone_number: null,
                profile_picture: null,
                profile_picture_id: null,
                score: null,
                user_name: null,
              },
              refresh_token: 'test',
              access_token: 'test',
            },
          },
        } as LoginByPasswordResponseType)
      }, 3000)
    })
  } else {
    return simpleAxios.post<LoginByPasswordResponseType>(endPoints.member.login, {member_id, password}).then((res) => res.data.data?.result)
  }
}
