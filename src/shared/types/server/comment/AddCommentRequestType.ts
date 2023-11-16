import {ExperienceTypeEnum} from '../resort/ResortItemResponseType'

export type AddCommentRequestType = {
  data: FormData
  resortId: string
}

export type AddCommentDataType = {
  member_id: number
  score: number
  experience_type: ExperienceTypeEnum
  content: string
  experience_time: string
  image2: Blob | null
}

export type LikeOrDislikeCommentRequestType = {
  status: number
}
