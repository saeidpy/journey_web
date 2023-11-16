import {QueryFunctionContext} from '@tanstack/react-query'
import {endPoints} from 'src/shared/constants'
import {ResortItemsResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'

export const cityRestaurantsQuery = async ({queryKey: [_, cityId], signal}: QueryFunctionContext<['CityRestaurants', string]>) => {
  return !cityId
    ? Promise.reject(new Error('Invalid id'))
    : await simpleAxios
        .get<ResortItemsResponseType>(endPoints.resort.restaurant, {params: {city_id: cityId}, signal})
        .then((response) => response.data.data?.result)
}
