import {yupResolver} from '@hookform/resolvers/yup'
import {t} from '@lingui/macro'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useCallback, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useUserProfile} from 'src/core/auth'
import {useSnackbar} from 'src/core/snackbar'
import {requiredValidationText} from 'src/shared/constants/form'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {ProvinceCityInputType} from 'src/shared/province-city-section'
import {ProfileResponseType} from 'src/shared/types/server'
import * as Yup from 'yup'
import {profileMutation} from '../profile.mutation'
import {profileQuery} from '../profile.query'

interface InputsEditProfilePage extends ProvinceCityInputType {
  name: string | null
  description: string | null
  phone_number: string | null
  email: string | null
}

const formValidation = Yup.object().shape({
  description: Yup.string()
    .max(50, t`description must be at most 50 characters`)
    .required(requiredValidationText),
  name: Yup.string().required(requiredValidationText),
  phone_number: Yup.number().required(requiredValidationText),
  email: Yup.string()
    .email(t`email must be a valid`)
    .required(requiredValidationText),
  city: Yup.object().nullable().shape({}),
  province: Yup.object().nullable().shape({}),
})

function useEditProfile() {
  const [isNewBadgeModalShown, setIsNewBadgeModalShown] = useState(false)
  const {user, setUser} = useUserProfile()
  const goBack = useHandleBack()
  const {data: profileData} = useQuery(['ProfilePage', ''], profileQuery, {
    placeholderData: user,
    staleTime: 0,
  })
  const {isLoading, mutateAsync, data: badgeData} = useMutation(profileMutation)
  const {showSnackbar} = useSnackbar()
  const methods = useForm<InputsEditProfilePage>({
    defaultValues: {
      description: profileData?.description ?? null,
      name: profileData?.name ?? null,
      city: profileData?.living_city ?? null,
      province: profileData?.living_city?.province ?? null,
      email: profileData?.email ?? null,
      phone_number: profileData?.phone_number ?? null,
    },
    resolver: yupResolver(formValidation) as any,
  })

  const handleUpdate = useCallback(
    (res?: ProfileResponseType['data']) => {
      if (res) {
        setUser(res.result)
        showSnackbar(t`Your profile has been updated.`)
        if (res.badge_list?.length ?? -1 > 0) {
          setIsNewBadgeModalShown(true)
        } else {
          goBack(true)
        }
      } else {
        showSnackbar(t`An error occurred`, {severity: 'error'})
      }
    },
    [goBack, setUser, showSnackbar]
  )

  const onSubmit = useCallback(
    (inputs: InputsEditProfilePage) => {
      mutateAsync({
        description: inputs.description ?? '',
        location: null,
        name: inputs.name ?? '',
        city_id: inputs?.city?.city_id?.toString() ?? null,
        email: inputs?.email ?? null,
        phone_number: inputs.phone_number ?? null,
      }).then(handleUpdate)
    },
    [mutateAsync, handleUpdate]
  )

  const onCloseBadge = useCallback(() => {
    if (profileData) {
      showSnackbar(t`Your profile has been updated.`)
      goBack(true)
    }
    setIsNewBadgeModalShown(false)
  }, [goBack, profileData, showSnackbar])

  const memberName = profileData?.name ?? ''
  const medalName = badgeData?.badge_list?.[0]?.medal ?? ''

  return {onSubmit, isLoading, isNewBadgeModalShown, profileData, methods, onCloseBadge, handleUpdate, memberName, medalName}
}

export default useEditProfile
