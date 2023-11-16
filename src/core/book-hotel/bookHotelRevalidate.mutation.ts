import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const bookHotelRevalidateMutation = (postData: {session_id: string; ticket_unique_hash: string}) => {
  return axiosWithAuth.post<BaseResponseType<boolean>>(endPoints.hotel.availability, postData).then((response) => {
    if (response.data.data?.result) {
      return true as const
    } else throw Error()
  })
}
