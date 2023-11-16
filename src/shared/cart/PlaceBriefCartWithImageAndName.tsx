import {t} from '@lingui/macro'
import {IconButton as MuiIconButton, Stack, styled, Typography} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {Cancel} from 'src/assets/icons'
import {noImagePng} from 'src/assets/img'
import {useUserProfile} from 'src/core/auth'
import {useSnackbar} from 'src/core/snackbar'
import {useScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {BaseResponseType, MediaResponse} from 'src/shared/types/server'
import {deletePhotoMutation} from './deletePhoto.mutation'
import {Image} from './Image'

export type NameAndImagePlaceProps = {
  name: string
  imageUrl: string
  resortId?: string
  author_member_id: number | string | null
  mediaId: number
}

const IconButton = styled(MuiIconButton)({
  padding: 0,
  position: 'absolute',
})

const Subtitle = styled(Typography)({
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})

export const PlaceBriefCartWithImageAndName = ({imageUrl, name, resortId, author_member_id, mediaId}: NameAndImagePlaceProps) => {
  const navigate = useNavigate()
  const {user} = useUserProfile()
  const {showSnackbar} = useSnackbar()
  const {data, refetch} = useScrollBasedInfiniteQuery<BaseResponseType<MediaResponse[]>['data']>()
  const pageIndex = data?.pages.findIndex((item) => item?.result.find((media) => media.media_id === mediaId)) ?? 0
  const {mutateAsync: deletePhotoMutationAsync, status: deletePhotoStatus, data: deletePhotoData} = useMutation(deletePhotoMutation)

  const removePhoto = () => {
    deletePhotoMutationAsync({resortId: resortId ?? '', mediaId: mediaId.toString() ?? ''})
      .then((res) => {
        if (res) {
          showSnackbar(t`Media has been removed. Thank you.`)
        } else {
          throw Error()
        }
      })
      .catch(() => {
        showSnackbar(t`An error occurred`, {severity: 'error'})
      })
      .finally(() => {
        refetch({refetchPage: (_, index) => index >= pageIndex})
      })
  }

  const ownComment = (user && user.member_id?.toString() === author_member_id?.toString()) ?? false
  const shouldShow =
    deletePhotoStatus === 'idle' || deletePhotoStatus !== 'success' || (deletePhotoStatus === 'success' && !deletePhotoData)
  return shouldShow ? (
    <Stack>
      <Stack position="relative" sx={{cursor: 'pointer'}}>
        {ownComment ? (
          <IconButton size="large" onClick={removePhoto}>
            <Cancel width="30px" height="30px" />
          </IconButton>
        ) : null}
        <Stack onClick={resortId ? () => navigate(`/things/${resortId}`) : undefined}>
          <Image alt="resort-photo" src={imageUrl || noImagePng} />
        </Stack>
      </Stack>
      <Stack>
        {name ? (
          <Subtitle variant="body1" color="shades.8" paddingY={1}>
            {name}
          </Subtitle>
        ) : null}
      </Stack>
    </Stack>
  ) : null
}
