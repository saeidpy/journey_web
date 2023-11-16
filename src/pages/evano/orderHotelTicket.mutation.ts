import {endPoints} from 'src/shared/constants'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const orderHotelTicket = async (postData: any) => {
  return axiosWithAuth.post(endPoints.flight.domestic.orderHotel, postData).then((data) => data.data.data?.result)
}
