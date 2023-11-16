import {QueryFunctionContext, QueryKey} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const genderQuery = ({signal}: QueryFunctionContext<QueryKey, number | undefined>) => {
  return axiosWithAuth?.get<BaseResponseType<[string, number][]>>(endPoints.flight.genders, {signal}).then((res) => res.data.data)
}
