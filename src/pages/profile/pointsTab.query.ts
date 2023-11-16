import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {PointsResponseType} from 'src/shared/types/server'
import {axiosWithAuth, simpleAxios} from 'src/shared/utils/axios'

export const pointsTabQuery = ({queryKey: [_, id], signal}: QueryFunctionContext<[string, string]>) => {
  return id !== ''
    ? simpleAxios.get<PointsResponseType>(endPoints.member.badge.getOthers(id), {signal: signal}).then((res) => res.data.data?.result)
    : axiosWithAuth.get<PointsResponseType>(endPoints.member.badge.list, {signal: signal}).then((res) => res.data.data?.result)
}
