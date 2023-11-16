import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const bookFlightRevalidateMutation = (postData: {session_id: string; fare_source_code: string}) => {
  return axiosWithAuth.post<BaseResponseType<boolean>>(endPoints.flight.domestic.validation, postData).then((response) => {
    if (response.data.data?.result) {
      return true as const
    } else throw Error()
  })
}
