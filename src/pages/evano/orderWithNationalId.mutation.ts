import {endPoints} from 'src/shared/constants'
import {ewanoRequestType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const orderWithNationalId = async (postData: ewanoRequestType) => {
  return axiosWithAuth.post(endPoints.flight.domestic.order, postData).then((data) => data.data.data?.result)
}
