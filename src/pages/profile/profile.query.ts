import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {ProfileResponseType} from 'src/shared/types/server'
import {axiosWithAuth, simpleAxios} from 'src/shared/utils/axios'

export const profileQuery = async ({queryKey: [_, id], signal}: QueryFunctionContext<[string, string]>) => {
  return id === ''
    ? await axiosWithAuth
        .get<ProfileResponseType>(endPoints.member.profile.self, {
          signal,
        })
        .then((response) => response.data.data?.result)
    : await simpleAxios
        .get<ProfileResponseType>(endPoints.member.profile.getOthers(id), {
          signal,
        })
        .then((response) => response.data.data?.result)
}
