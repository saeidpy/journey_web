import {endPoints} from 'src/shared/constants'
import {ProfileResponseType} from 'src/shared/types/server'
import {axiosWithAuth} from 'src/shared/utils/axios'

export const profileMutation = async ({
  location,
  name,
  description,
  city_id,
  email,
  phone_number,
}: {
  location: string | null
  name: string
  description: string
  city_id: string | null
  phone_number: string | null
  email: string | null
}) => {
  return axiosWithAuth
    .put<ProfileResponseType>(endPoints.member.profile.edit, {location, name, description, city_id, email, phone_number})
    .then((res) => res.data.data)
}
