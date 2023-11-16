import {endPoints} from 'src/shared/constants'
import {ResortPhotoResponseType} from 'src/shared/types/server'
import {simpleAxios} from 'src/shared/utils/axios'
export const getResortPhotos = async (resortId: any, pageParam: any) => {
  const {data} = await simpleAxios.get<ResortPhotoResponseType>(`${endPoints.resort.detail.media.self(resortId)}?page=${pageParam ?? 1}`)
  return data?.data ? {...data.data, page: pageParam} : ''
}
