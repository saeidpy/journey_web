import {t, Trans} from '@lingui/macro'
import {Stack, styled} from '@mui/material'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useUserProfile} from 'src/core/auth'
import {useSnackbar} from 'src/core/snackbar'
import {Button} from 'src/shared/button'
import {NewBadge} from 'src/shared/newBadge'
import {thingsAddPhotoMutation} from './thingsAddPhoto.mutation'

const FooterContainer = styled(Stack)(({theme}) => ({
  color: theme.palette.white,
  width: '100%',
  height: 'fit-content',
  padding: theme.spacing(3, 2),
}))

interface ThingsAddPhotoFooterProps {
  files: File[]
  resortId: string
  onProgress: (progress: number | undefined) => void
}

export const ThingsAddPhotoFooter = ({files, resortId, onProgress}: ThingsAddPhotoFooterProps) => {
  const [isNewBadgeModalShown, setIsNewBadgeModalShown] = useState(false)
  const {mutateAsync, data} = useMutation(thingsAddPhotoMutation)
  const queryClient = useQueryClient()
  const {user} = useUserProfile()
  const navigate = useNavigate()
  const {showSnackbar} = useSnackbar()
  const abortController = useRef(new AbortController())
  useEffect(
    () => () => {
      if (!abortController.current.signal.aborted) {
        abortController.current.abort()
      }
    },
    []
  )
  const uploadImage = () => {
    onProgress(0)
    const formData = new FormData()
    files.forEach((file, i) => {
      formData.append(`image_${i}`, file)
    })
    if (abortController.current.signal.aborted) {
      abortController.current = new AbortController()
    }
    const signal = abortController.current.signal
    mutateAsync({
      formData,
      resortId,
      signal,
      onProgress,
    })
      .then((res) => {
        if (res) {
          queryClient.invalidateQueries({queryKey: ['ThingsPage', resortId]})
          showSnackbar(t`Media has been submitted. Thank you.`)
          if ((res?.badge_list?.length ?? -1) > 0) {
            setIsNewBadgeModalShown(true)
          } else {
            navigate('../things-photos', {replace: true})
          }
        } else {
          throw Error()
        }
      })
      .catch(() => {
        showSnackbar(t`An error occurred`, {severity: 'error'})
        onProgress(undefined)
      })
  }
  return (
    <FooterContainer>
      <Button fullWidth variant="contained" color="primary" onClick={uploadImage}>
        <Trans>Upload image</Trans>
      </Button>
      {isNewBadgeModalShown && (
        <NewBadge
          close={() => {
            navigate('../things-photos', {replace: true})
            setIsNewBadgeModalShown(false)
          }}
          medalName={(data?.badge_list ?? [])[0]?.medal ?? ''}
          memberName={user?.name ?? ''}
        />
      )}
    </FooterContainer>
  )
}
