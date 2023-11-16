import {Profile} from '../AuthTypes'
import {MediaResponse} from './MediaResponse'

export interface CommentResponse {
  author: Profile | null
  author_id: number
  comment_id: number
  content: string
  created_at: Date | string
  dislike_count: number
  experience_time: Date | string | null
  experience_type: string
  impression_of_the_caller: null | 'like' | 'dislike'
  like_count: number
  media_list: MediaResponse[]
  resort_id: number
  score: number
}
