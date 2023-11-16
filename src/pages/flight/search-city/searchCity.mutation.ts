import {endPoints} from 'src/shared/constants'
import {SearchAirportResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const searchCityMutation = ({searchTerm, signal}: {searchTerm: string; signal: AbortSignal}) => {
  return axiosWithAuth
    .get<SearchAirportResponseType>(endPoints.search.airport.city.term(searchTerm), {
      signal,
    })
    .then((response) => response.data.data?.result)
}
