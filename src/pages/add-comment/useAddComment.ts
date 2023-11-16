import {yupResolver} from '@hookform/resolvers/yup'
import {t} from '@lingui/macro'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useLocation, useParams} from 'react-router-dom'
import {useUserProfile} from 'src/core/auth'
import {useSnackbar} from 'src/core/snackbar'
import {resortInfoQuery} from 'src/pages/things/resortInfo.query'
import {requiredValidationText} from 'src/shared/constants/form'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {AddCommentRequestType, ExperienceTypeEnum, ResortResponseItem} from 'src/shared/types/server'
import * as Yup from 'yup'
import {addCommentMutation} from './addComment.mutation'

type Inputs = {
  date: Date | null
  rate: number | null
  experienceType: ExperienceTypeEnum | null
  comment: string | null
  image2: Blob | null
}

const formValidation = Yup.object().shape({
  comment: Yup.string()
    .max(50, t`description must be at most 50 characters`)
    .required(requiredValidationText),
  date: Yup.date().required(requiredValidationText),
  rate: Yup.number().required(requiredValidationText),
  experienceType: Yup.string().required(requiredValidationText),
  image2: Yup.object().nullable().shape({}),
})

function useAddComment() {
  const {
    handleSubmit,
    control,
    formState: {errors, isDirty},
  } = useForm<Inputs>({
    defaultValues: {date: null, rate: null, experienceType: null, comment: null, image2: null},
    resolver: yupResolver(formValidation) as any,
  })

  const [isNewBadgeModalShown, setIsNewBadgeModalShown] = useState(false)
  const [isShownCropper, setIsShownCropper] = useState(false)
  const [selectedImages, setSelectedImages] = useState<Blob[] | null>(null)
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string[] | null>(null)
  const {user} = useUserProfile()
  const {mutateAsync, data: mutationData, isLoading} = useMutation(addCommentMutation)
  const queryClient = useQueryClient()
  const {showSnackbar} = useSnackbar()
  const {id: resortId = ''} = useParams<{id: string}>()
  const inputPhotoRef = useRef<HTMLInputElement | null>(null)
  const resort = useLocation()?.state?.resort as ResortResponseItem
  const goBack = useHandleBack()

  const {data: thingData} = useQuery(['ThingsPage', resortId], resortInfoQuery, {
    placeholderData: resort,
    staleTime: 0,
  })

  useEffect(() => {
    const element = document.getElementById('comment-form')
    if (element && errors.rate) {
      element.parentElement?.scrollIntoView({behavior: 'smooth'})
    }
  }, [errors.rate, isDirty])
  const onAddingPhotoBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputPhotoRef.current?.click()
  }

  const onFileChangeCapture = (e: ChangeEvent<HTMLInputElement>) => {
    /*Selected files data can be collected here.*/
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      setIsShownCropper(true)
    }
  }

  const getCropData = (blob: Blob | null) => {
    if (blob) {
      setPhotoPreview((prev) => (prev ? [...prev, URL.createObjectURL(blob)] : [URL.createObjectURL(blob)]))
      setSelectedImages((prev) => (prev ? [...prev, blob] : [blob]))
      setIsShownCropper(false)
    }
  }

  const removeSelectedPhoto = (index: number) => {
    setSelectedImages((prev) => (prev ? prev.filter((_, i) => i !== index) : prev))
    setPhotoPreview((prev) => (prev ? prev.filter((_, i) => i !== index) : prev))
  }

  const onSubmit = useCallback(
    (form_data: Inputs) => {
      if (resortId) {
        const formData = new FormData()
        formData.append('content', form_data?.comment ?? '')
        formData.append('experience_time', form_data?.date?.toISOString().split('.')[0] ?? '')
        formData.append('experience_type', form_data?.experienceType ?? '')
        formData.append('member_id', user?.member_id?.toString() ?? '-1')
        formData.append('score', form_data?.rate?.toString() ?? '')
        selectedImages?.map((item, index) => {
          return formData.append(`image_${index + 1}`, item)
        })

        const dataToPost: AddCommentRequestType = {
          data: formData,
          resortId,
        }

        mutateAsync({data: dataToPost}).then((res) => {
          queryClient.invalidateQueries({queryKey: ['ThingsPage', resortId]})
          showSnackbar(t`Comment has been submitted. Thank you.`)
          if ((res?.badge_list?.length ?? -1) > 0) {
            setIsNewBadgeModalShown(true)
          } else {
            goBack(true)
          }
        })
      }
    },
    [resortId, user?.member_id, selectedImages, mutateAsync, queryClient, showSnackbar, goBack]
  )

  const onCloseBadge = useCallback(() => {
    showSnackbar(t`Comment has been submitted. Thank you.`)
    goBack(true)
    setIsNewBadgeModalShown(false)
  }, [goBack, showSnackbar])

  const memberName = user?.name ?? ''
  const medalName = mutationData?.badge_list?.[0]?.medal ?? ''

  return {
    thingData,
    handleSubmit,
    onSubmit,
    control,
    inputPhotoRef,
    onFileChangeCapture,
    onAddingPhotoBtnClick,
    photoPreview,
    removeSelectedPhoto,
    isLoading,
    isNewBadgeModalShown,
    isShownCropper,
    selectedImage,
    setIsShownCropper,
    getCropData,
    onCloseBadge,
    memberName,
    medalName,
  }
}

export default useAddComment
