import {QueryFunctionContext, QueryKey} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {LastPassengerResponse} from 'src/shared/types/server/hotel/HotelLastPassengerResponseType'
import {axiosWithAuth} from 'src/shared/utils/axios'

export interface MemberPassengerResponseType {
  passengers: LastPassengerResponse[]
}

export const memberPassenger = async ({signal}: QueryFunctionContext<QueryKey, number | undefined>) => {
  return axiosWithAuth
    .get<BaseResponseType<MemberPassengerResponseType>>(endPoints.flight.domestic.passenger, {signal})
    .then((res) => res?.data.data)
}
