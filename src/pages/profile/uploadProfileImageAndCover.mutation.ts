import {endPoints} from 'src/shared/constants'
import {ProfileResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const uploadProfileImageAndCoverMutation = async ({
  formData,
  signal,
  onProgress,
}: {
  formData: FormData
  signal: AbortSignal
  onProgress?: (progress: number) => void
}) => {
  return await axiosWithAuth
    .put<ProfileResponseType>(endPoints.member.profile.picture.edit, formData, {
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
    .then((response) => response.data?.data)
}
