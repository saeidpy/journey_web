import {endPoints} from '../constants'
import {axiosWithAuth} from '../utils/axios'

export const deletePhotoMutation = async ({resortId, mediaId}: {resortId: string; mediaId: string}) => {
  return await axiosWithAuth
    .delete(endPoints.resort.detail.media.delete(resortId, mediaId))
    .then((response) => response?.data?.data?.result)
}
