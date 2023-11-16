import {endPoints} from 'src/shared/constants'
import {BaseResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const shareMutation = ({resortId}: {resortId: string}) => {
  return axiosWithAuth.get<BaseResponseType<string>>(endPoints.resort.detail.share(resortId)).then((res) => res.data.data?.result)
}
