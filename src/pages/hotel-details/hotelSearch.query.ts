import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType, HotelSearchByResortIdRequestType, HotelSearchByResortIdType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const hotelSearchQuery = async ({
  queryKey: [_, data],
  signal,
}: QueryFunctionContext<['hotelRooms', HotelSearchByResortIdRequestType]>) => {
  try {
    return simpleAxios
      .post<BaseResponseType<HotelSearchByResortIdType>>(endPoints.hotel.search.hotel, data)
      .then((res) => res.data.data?.result?.tickets ?? [])
  } catch (err) {}
}
