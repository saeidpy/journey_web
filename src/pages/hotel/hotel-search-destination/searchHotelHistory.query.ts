import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {SearchHotelResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const searchHotelHistoryQuery = async ({signal}: QueryFunctionContext<['SearchHotelHistoryQuery']>) => {
  const res = await axiosWithAuth?.get<SearchHotelResponseType>(`${endPoints.hotel.search.history}`, {signal})
  const result = res.data.data?.result ?? []
  if (result.length > 3) {
    return result
  }
  return [
    ...result,
    // ...(await axiosWithAuth?.get<AirportMostVisitedResponseType>(`${endPoints.flight.airport.mostvisited}`, {signal}).then(
    //   (res) =>
    //     res.data.data?.result.map((item) => ({
    //       entity: null,
    //       entity_type: item.station_type,
    //       id: item.code,
    //       result_text: item.name_fa,
    //       search_text: item.name_fa,
    //     })) ?? []
    // )),
  ]
}
