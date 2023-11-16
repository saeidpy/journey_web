import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography, useTheme} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {ChangeEvent, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {LeftArrow, PlusButton} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {mobileUI, StorageKeys} from 'src/shared/constants'
import {ImageUploader} from 'src/shared/image-uploader'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {ProfileResponseType} from 'src/shared/types/server'
import {logoutMutation} from './logout.mutation'
import {uploadProfileImageAndCoverMutation} from './uploadProfileImageAndCover.mutation'
type HeaderProp = {
  hasBackButton: Boolean
  hasFeedbackButton: Boolean
  coverAlt: string
  coverSrc: string
  profileSrc: string
  isPhotoChangeable: boolean
  onFinishUpload?: (res?: ProfileResponseType['data']) => void
}

const HiddenInput = styled('input')({
  display: 'none',
})
export const ProfileHeaderWithCover = ({
  hasFeedbackButton,
  hasBackButton,
  isPhotoChangeable,
  coverAlt,
  coverSrc,
  profileSrc,
  onFinishUpload,
}: HeaderProp) => {
  const theme = useTheme()
  const handleBackButton = useHandleBack()

  const [isShown, setIsShown] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null)
  const [pictureType, setPictureType] = useState<'profile_picture' | 'cover_picture'>()
  const [progress, setProgress] = useState<number>()
  const inputProfileRef = useRef<HTMLInputElement | null>(null)
  const inputCoverRef = useRef<HTMLInputElement | null>(null)
  const {mutateAsync} = useMutation(uploadProfileImageAndCoverMutation)
  const abortController = useRef(new AbortController())
  const navigate = useNavigate()

  useEffect(
    () => () => {
      if (!abortController.current.signal.aborted) {
        abortController.current.abort()
      }
    },
    []
  )

  const onFileChangeCapture = (e: ChangeEvent<HTMLInputElement>, type: 'profile_picture' | 'cover_picture') => {
    /*Selected files data can be collected here.*/
    if (e.target.files && e.target.files.length > 0) {
      setPictureType(type)
      setSelectedImage(e.target.files[0])
      setIsShown(true)
    }
  }
  const onProfileBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputProfileRef.current?.click()
  }
  const onCoverBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputCoverRef.current?.click()
  }
  const getCropData = (blob: Blob | null) => {
    if (blob) {
      setProgress(0)
      if (abortController.current.signal.aborted) {
        abortController.current = new AbortController()
      }
      const signal = abortController.current.signal
      const formData = new FormData()
      formData.append('image', blob)
      formData.append('picture_type', pictureType as string)
      mutateAsync({formData, signal, onProgress: setProgress})
        .then(onFinishUpload)
        .catch(() => onFinishUpload?.())
        .finally(() => {
          setProgress(undefined)
          setIsShown(false)
          setSelectedImage(null)
        })
    }
  }

  const {mutateAsync: logoutMutate} = useMutation(logoutMutation)

  const logout = async () => {
    logoutMutate().then((res) => {
      localStorage.removeItem(StorageKeys.authData)
      //navigate('/login')
      window.location.href = '/login?returnUrl=/profile'
    })
  }
  return (
    <>
      <Stack width={'100%'}>
        <Stack position={'relative'} width={'100%'} textAlign={'right'}>
          <img alt={coverAlt} src={coverSrc} width={'100%'} />
          {isPhotoChangeable ? (
            <Stack sx={{position: 'absolute'}}>
              <HiddenInput
                type="file"
                ref={inputCoverRef}
                onChangeCapture={(e: ChangeEvent<HTMLInputElement>) => onFileChangeCapture(e, 'cover_picture')}
              />
              <PlusButton onClick={onCoverBtnClick} />
            </Stack>
          ) : null}
          {hasBackButton ? (
            <Stack>
              <Button
                variant="contained"
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '40px',
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  backgroundColor: 'white',
                  padding: 0,
                  minWidth: 0,
                  minHeight: 0,
                  zIndex: mobileUI.zIndex.backButton,
                }}
                onClick={handleBackButton}
              >
                <LeftArrow />
              </Button>
            </Stack>
          ) : null}
          {hasFeedbackButton && (
            <Stack position="absolute" left="0" bottom="26px">
              <Button
                variant="text"
                color="error"
                onClick={() => {
                  navigate('/profile/feedback')
                }}
              >
                {t`Feedback`}
              </Button>
            </Stack>
          )}

          {hasFeedbackButton ? (
            <Typography color={theme.palette.error.main} sx={{cursor: 'pointer'}} onClick={logout}>
              <Trans>Exit</Trans>
            </Typography>
          ) : (
            ''
          )}

          <Stack textAlign={'center'} alignItems={'center'}>
            <Stack
              sx={{background: `url(${profileSrc})`, backgroundPosition: '50% 50%', backgroundSize: 'cover'}}
              borderRadius={theme.spacing(15)}
              justifyContent={'flex-end'}
              position={'relative'}
              width={theme.spacing(15)}
              height={theme.spacing(15)}
              marginTop={theme.spacing(-10)}
            >
              {isPhotoChangeable ? (
                <Stack m={theme.spacing(0, 0, 2, -1)}>
                  <HiddenInput
                    type="file"
                    ref={inputProfileRef}
                    onChangeCapture={(e: ChangeEvent<HTMLInputElement>) => onFileChangeCapture(e, 'profile_picture')}
                  />
                  <PlusButton onClick={onProfileBtnClick} />
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isShown && selectedImage && (
        <ImageUploader
          onClose={() => {
            setIsShown(false)
          }}
          image={URL.createObjectURL(selectedImage)}
          getCropData={getCropData}
          progress={progress}
          options={
            pictureType === 'cover_picture' ? {aspectRatio: 3.35, initialAspectRatio: 3.35} : {aspectRatio: 1, initialAspectRatio: 1}
          }
        />
      )}
    </>
  )
}
