import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType, SearchHotelType} from 'src/shared/types/server'
import {SearchCityHotelTypeResponse} from 'src/shared/types/server/hotel/SearchHotelTypes'
import {simpleAxios} from 'src/shared/utils/axios'

export const hotelCityQuery = async ({queryKey: [_, data], signal}: QueryFunctionContext<['hotel', SearchHotelType]>) => {
  try {
    return await simpleAxios
      .post<BaseResponseType<SearchCityHotelTypeResponse>>(endPoints.hotel.search.city, data, {signal: signal})
      .then((response) => {
        try {
          return Object.entries(response.data.data?.result?.tickets ?? {}).map((item) => ({resortId: item[0], ...item[1]}))
        } catch (error) {}
      })
  } catch (err: any) {
    return err.response.data.code
  }
}
