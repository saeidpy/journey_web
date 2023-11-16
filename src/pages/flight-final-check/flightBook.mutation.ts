import {endPoints} from 'src/shared/constants'
import {BookRequestType, BookResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const flightBookMutation = (postData: BookRequestType) => {
  return axiosWithAuth.post<BookResponseType>(endPoints.flight.domestic.book, postData).then((response) => response.data.data?.result)
}
