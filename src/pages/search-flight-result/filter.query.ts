import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const filterCabinQuery = ({signal}: QueryFunctionContext<['filterCabinQuery']>) =>
  axiosWithAuth.get<BaseResponseType<[string, number][]>>(endPoints.flight.cabins, {signal}).then((response) => response?.data.data?.result)

export const filterTicketQuery = ({signal}: QueryFunctionContext<['filterTicketQuery']>) =>
  axiosWithAuth
    .get<BaseResponseType<[string, number][]>>(endPoints.flight.tickets.base, {signal})
    .then((response) => response?.data.data?.result)

export const filterAgesQuery = ({signal}: QueryFunctionContext<['filterAgesQuery']>) =>
  axiosWithAuth.get<BaseResponseType<[string, number][]>>(endPoints.flight.ages, {signal}).then((response) => response?.data.data?.result)

export const filterGendersQuery = ({signal}: QueryFunctionContext<['filterGendersQuery']>) =>
  axiosWithAuth
    .get<BaseResponseType<[string, number][]>>(endPoints.flight.genders, {signal})
    .then((response) => response?.data.data?.result)

export const filterTicketsSortQuery = ({signal}: QueryFunctionContext<['filterTicketsSortQuery']>) =>
  axiosWithAuth.get<{result: [string, string][]}>(endPoints.flight.tickets.sort.type, {signal}).then((response) => response?.data.result)

export const filterAirlineQuery = async ({signal}: QueryFunctionContext<['filterAirlineQuery']>) =>
  axiosWithAuth
    .get<BaseResponseType<[string, string][]>>(endPoints.flight.airline.types, {signal})
    .then((response) => response?.data.data?.result)

export const filterDepartureTimeQuery = async ({signal}: QueryFunctionContext<['filterDepartureTimeQuery']>) =>
  axiosWithAuth
    .get<BaseResponseType<[string, string][]>>(endPoints.flight.departure.time.types, {signal})
    .then((response) => response?.data.data?.result)
