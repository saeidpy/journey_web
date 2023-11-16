import {Profile} from '../AuthTypes'
import {BaseResponseType} from '../BaseResponseType'

export enum BadgeType {
  PRIMARY_BADGE_TYPE = 'نشان‌های اولین',
  COMPLETE_BADGE_TYPE = 'نشان‌های تکمیل کردن',
  COMMENT_BADGE_TYPE = 'نشان‌های دیدگاه',
}

export enum MedalType {
  MARCO_POLO = 'مارکوپولو',
}
export interface PointResponse {
  badge_type: BadgeType
  created_at: string
  description: string
  medal: MedalType
  member: Profile | null
  member_badge_id: null
  name_en: string
  name_fa: string
  valid_time_in_days: null
  validation_time: null
}

export type PointsResponseType = BaseResponseType<PointResponse[]>
