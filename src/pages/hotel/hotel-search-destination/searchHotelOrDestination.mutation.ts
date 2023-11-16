import {endPoints} from 'src/shared/constants'
import {SearchHotelResponseType} from 'src/shared/types/server/hotel/SearchHotelResponse'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const searchHotelOrDestinationMutation = ({searchTerm, signal}: {searchTerm: string; signal: AbortSignal}) => {
  return axiosWithAuth
    .get<SearchHotelResponseType>(endPoints.hotel.search.destination(searchTerm), {
      signal,
    })
    .then((response) => response.data.data?.result)
}
