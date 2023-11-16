import {endPoints} from 'src/shared/constants'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const uploadThingsPhotoMutation = async ({resortId, data}: {resortId: string; data: FormData}) => {
  return await axiosWithAuth
    .put(endPoints.resort.detail.media.new(resortId), {
      data,
    })
    .then((response) => response?.data.data)
}
