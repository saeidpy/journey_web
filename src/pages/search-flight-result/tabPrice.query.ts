import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {CheapestDailyRequestType, CheapestDailyResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const tabPriceQuery = async ({
  queryKey: [_, session_id, source_code, destination_code, departure_date, return_date],
  signal,
}: QueryFunctionContext<['TabPrice', string, string, string, string, string | undefined]>) => {
  const postData: CheapestDailyRequestType = {
    session_id,
    source_code,
    destination_code,
    departure_date,
  }
  if (return_date) {
    postData.return_date = return_date
  }
  return axiosWithAuth
    .post<CheapestDailyResponseType>(endPoints.flight.domestic.cheapest.daily, postData, {
      signal,
    })
    .then((response) => response?.data.data?.result)
}
