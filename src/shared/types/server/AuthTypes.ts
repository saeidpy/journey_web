import {ChangeAllKeysTo} from 'src/shared/utils/types'
import {BaseResponseType} from './BaseResponseType'
import {PlaceTypeEnum, ResortResponseItem} from './resort/ResortItemResponseType'
import {CommentResponse} from './shared/CommentResponse'
import {LocationCityResponse} from './shared/LocationCityResponse'
import {MediaResponse} from './shared/MediaResponse'

export interface LoginRequestType {
  input_text: string
}

interface Login {
  is_new: boolean
  member:
    | (ChangeAllKeysTo<Omit<Profile, 'email'>, null> & {
        email: string
      })
    | (ChangeAllKeysTo<Omit<Profile, 'phone_number'>, null> & {
        phone_number: string
      })
}

export type LoginResponseType = BaseResponseType<Login>

export type GoogleLoginResponseType = BaseResponseType<string>

export interface LoginByPasswordRequestType {
  member_id: number
  password: string
}

interface LoginByPassword extends Auth {
  member: ChangeAllKeysTo<Omit<Profile, 'member_id' | 'password'>, null> & LoginByPasswordRequestType
}

export type LoginByPasswordResponseType = BaseResponseType<LoginByPassword>

interface OTPRequestEmailType {
  email: string
  phone_number?: never
}

interface OTPRequestPhoneType {
  email?: never
  phone_number: string
}

export type OTPRequestType = (OTPRequestEmailType | OTPRequestPhoneType) & {
  verification_code: string
}

interface OTP extends Auth {
  member:
    | (ChangeAllKeysTo<Omit<Profile, 'email' | 'member_id'>, null> & {
        email: string
        member_id: number
      })
    | (ChangeAllKeysTo<Omit<Profile, 'phone_number' | 'member_id'>, null> & {
        phone_number: string
        member_id: number
      })
}

export type OTPResponseType = BaseResponseType<OTP>

export interface RestorePasswordRequestType {
  email: string
}

interface RestorePassword extends ChangeAllKeysTo<Omit<Profile, 'email'>, null> {
  email: string
}

export type RestorePasswordResponseType = BaseResponseType<RestorePassword>

export interface SetPasswordRequestType {
  member_id: number
  password: string
  token: string
}

interface SetPassword extends ChangeAllKeysTo<Omit<Profile, 'member_id'>, null> {
  member_id: number
}

export type SetPasswordResponseType = BaseResponseType<SetPassword>

export interface SetUsernameRequestType {
  name: string
}

interface SetUsername extends ChangeAllKeysTo<Omit<Profile, 'member_id' | 'user_name'>, null> {
  member_id: number
  user_name: string
}

export type SetUsernameResponseType = BaseResponseType<SetUsername>

// interface RefreshToken {
//   access_token: string
// }

export type RefreshTokenResponseType = BaseResponseType<string>

export interface Auth {
  refresh_token: string
  access_token: string
}

export type AuthResponseType = BaseResponseType<Auth>

export interface Profile {
  cover_picture: MediaResponse | null
  description: string | null
  email: string | null
  living_city: LocationCityResponse | null
  member_id: number
  name: string | null
  password: string | null
  phone_number: string | null
  profile_picture: MediaResponse | null
  resort_pic_by_me: MediaResponse[]
  score: number
  user_name: string | null
}

export interface ProfileMediaResponse {
  media: MediaResponse
  related_model: ResortResponseItem | null
  related_model_type: PlaceTypeEnum
}

export interface EvanaLoginResponseType {
  access_token: string
  refresh_token: string
}

export type EvanaResponseType = BaseResponseType<EvanaLoginResponseType>

export type ProfileResponseType = BaseResponseType<Profile>

export type CommentResponseType = BaseResponseType<CommentResponse[]>

export type PhotoReponseType = BaseResponseType<ProfileMediaResponse[]>
