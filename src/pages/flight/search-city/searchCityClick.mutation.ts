import {endPoints} from 'src/shared/constants'
import {BaseResponseType, SearchAirportItem} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const searchCityMutation = (params: SearchAirportItem) => {
  return axiosWithAuth
    .get<BaseResponseType<SearchAirportItem>>(endPoints.search.click.airport, {
      params,
    })
    .then((response) => response.data.data?.result)
}
