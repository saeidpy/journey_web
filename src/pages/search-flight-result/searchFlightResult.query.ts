import {QueryFunctionContext} from '@tanstack/react-query'
import {AxiosError} from 'axios'
import {endPoints} from 'src/shared/constants'
import {TicketResponse, TicketResponseType, TicketsRequestType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const searchFlightResultQuery = async ({
  queryKey: [
    _,
    source_code,
    destination_code,
    departure_date,
    return_date,
    min_price,
    max_price,
    airline_type,
    ticket_type,
    sort_type,
    flight_departure_time,
    adult_count,
    child_count,
    infant_count,
  ],
  signal,
}: QueryFunctionContext<
  [
    'SearchFlightResultQuery',
    string,
    string,
    string,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    number,
    number,
    number
  ]
>) => {
  const postData: TicketsRequestType = {
    source_code,
    destination_code,
    departure_date,
    return_date,
    min_price,
    max_price,
    airline_type,
    ticket_type,
    sort_type,
    flight_departure_time,
    adult_count,
    child_count,
    infant_count,
  }
  if (return_date) {
    postData.return_date = return_date
  }
  return axiosWithAuth
    .post<TicketResponseType>(endPoints.flight.domestic.search, postData, {
      signal,
    })
    .then((response) => {
      return response?.data.data?.result ?? ({session_id: '', tickets: []} as TicketResponse)
    })
    .catch((res: AxiosError) => {
      if (res.response?.status === 400) {
        return {
          session_id: '',
          tickets: [],
        } as TicketResponse
      }
      throw res
    })
}
