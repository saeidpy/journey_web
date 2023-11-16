import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {PhotoReponseType} from 'src/shared/types/server/AuthTypes'
import {axiosWithAuth, simpleAxios} from 'src/shared/utils/axios'

export const photoTabQuery = ({queryKey: [_, id], pageParam, signal}: QueryFunctionContext<[string, string]>) => {
  return id === ''
    ? axiosWithAuth
        ?.get<PhotoReponseType>(`${endPoints.member.photos.self}?page=${pageParam ?? 0}`, {signal: signal})
        .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
    : simpleAxios
        .get<PhotoReponseType>(`${endPoints.member.photos.getOthers(id)}?page=${pageParam ?? 0}`, {signal: signal})
        .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
}
