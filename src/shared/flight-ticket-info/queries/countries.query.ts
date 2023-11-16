import {QueryFunctionContext, QueryKey} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const countriesQuery = ({signal}: QueryFunctionContext<QueryKey, number | undefined>) => {
  return axiosWithAuth?.get<BaseResponseType<[string, string][]>>(endPoints.flight.countries, {signal}).then((res) => res.data.data)
}
