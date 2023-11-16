import {yupResolver} from '@hookform/resolvers/yup'
import {t} from '@lingui/macro'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useCallback} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'src/core/snackbar'
import {requiredValidationText} from 'src/shared/constants/form'
import {AddPlaceDataToPostType, ResortTypeEnum} from 'src/shared/types/server'
import * as Yup from 'yup'
import {addPlaceMutation} from './addPlace.mutation'
import {resortFilterQuery} from './addPlace.query'
import {InputsAddPlacePage} from './AddPlacePage'

const formValidation = Yup.object().shape({
  address: Yup.string().required(requiredValidationText),
  description: Yup.string().max(50, t`description must be at most 50 characters`),
  name: Yup.string().required(requiredValidationText),
  resort_filter: Yup.string().required(requiredValidationText),
  resort_type: Yup.string().nullable().required(requiredValidationText),
  label: Yup.array()
    .required('Label is required')
    .min(1, t`Label must have at least one item`)
    .of(Yup.string().required(requiredValidationText)),
  city: Yup.object().nullable().shape({}).required(requiredValidationText),
  province: Yup.object().nullable().shape({}).required(requiredValidationText),
  location: Yup.object().shape({}).required(requiredValidationText),
})

export const useAddPlace = () => {
  const {showSnackbar} = useSnackbar()
  const navigate = useNavigate()
  const methods = useForm<InputsAddPlacePage>({
    defaultValues: {
      address: '',
      city: null,
      description: '',
      label: [],
      name: '',
      province: null,
      resort_filter: '',
      resort_type: null,
    },
    resolver: yupResolver(formValidation) as any,
  })
  const {handleSubmit, control, watch} = methods
  const resortFilterName = watch('resort_type') ?? ''

  const {isLoading, mutateAsync} = useMutation(addPlaceMutation)
  const {data: resortData} = useQuery(['resortFilter', resortFilterName], resortFilterQuery, {
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!resortFilterName,
    suspense: false,
  })

  const resortOptions = resortData?.map((x) => {
    return {label: x[0], value: x[1]}
  })

  const onSubmit: SubmitHandler<InputsAddPlacePage> = useCallback(
    (data: InputsAddPlacePage) => {
      const dataToPost: AddPlaceDataToPostType = {
        city_name: data.city?.city_name_fa ?? '',
        description: data?.description ?? '',
        name_fa: data.name,
        resort_type: data.resort_type as ResortTypeEnum,
        province_name: data?.province?.province_name_fa ?? '',
        latitude: data.location.lat,
        longitude: data.location.lng,
        resort_filter: data.resort_filter,
        tags: data.label,
      }

      mutateAsync(dataToPost).then(() => {
        showSnackbar(t`Place has been submitted for review. Thank you.`)
        navigate('/')
      })
    },
    [mutateAsync, showSnackbar, navigate]
  )

  return {
    onSubmit,
    isLoading,
    resortOptions,
    handleSubmit,
    control,
    methods,
  }
}
