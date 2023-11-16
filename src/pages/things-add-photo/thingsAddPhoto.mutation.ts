import {endPoints} from 'src/shared/constants'
import {BaseResponseType, MediaResponse} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const thingsAddPhotoMutation = async ({
  resortId,
  formData,
  signal,
  onProgress,
}: {
  resortId: string
  formData: FormData
  signal: AbortSignal
  onProgress?: (progress: number) => void
}) => {
  return await axiosWithAuth
    .put<BaseResponseType<MediaResponse[]>>(endPoints.resort.detail.media.new(resortId), formData, {
      signal,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress
        ? (progressEvent) => {
            if (progressEvent.total) {
              const progress = (progressEvent.loaded * 100) / progressEvent.total
              onProgress(progress)
            }
          }
        : undefined,
    })
    .then((response) => response.data.data)
}
