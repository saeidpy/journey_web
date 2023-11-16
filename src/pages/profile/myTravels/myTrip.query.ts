import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType, MyTripsType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const myTripQuery = async ({queryKey: [_], pageParam, signal}: QueryFunctionContext<['myTrips']>) => {
  return axiosWithAuth
    .get<BaseResponseType<MyTripsType[]>>(endPoints.member.profile.myTrips + `?page=${pageParam ?? 0}`, {signal: signal})
    .then((res) => (res.data.data ? {...res.data.data, page: pageParam} : undefined))
}
