import {endPoints} from 'src/shared/constants'
import {AddPlaceDataToPostType, BaseResponseType, LocationCityResponse} from 'src/shared/types/server'
import {axiosWithAuth, simpleAxios} from 'src/shared/utils/axios'

export const addPlaceMutation = async (data: AddPlaceDataToPostType) => {
  return axiosWithAuth.post(endPoints.resort.add.place, data).then((response) => response.data.data?.result)
}

export const getCitiesByProvinceIdQuery = async ({provinceId, signal}: {provinceId: string; signal: AbortSignal}) => {
  return await simpleAxios
    .get<BaseResponseType<LocationCityResponse[]>>(endPoints.province.detail(provinceId), {
      signal,
    })
    .then((response) => response?.data.data?.result)
}
