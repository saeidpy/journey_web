import {t, Trans} from '@lingui/macro'
import {Button as MuiButton, Grid, IconButton as MuiIconButton, Stack, styled, Typography, useTheme} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Cancel, Dislike, DislikeFilled, GreenLike, GreenLikeFilled} from 'src/assets/icons'
import {useUserProfile} from 'src/core/auth'
import {useSnackbar} from 'src/core/snackbar'
import {NewBadge} from 'src/shared/newBadge'
import {RateIcon} from 'src/shared/rate'
import {useScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {BaseResponseType, CommentResponse} from 'src/shared/types/server'
import {UserInfoSection, UserInfoSectionProps} from 'src/shared/user-info-section'
import {formatDate} from 'src/shared/utils/jalaliDate'
import {likeOrDislikeCommentMutation} from './comment.mutation'
import {deleteCommentMutation} from './deleteComment.mutation'

interface CommentProp {
  author_member_id?: number
  resort_id: number
  text: string
  dislikeCount: number
  likeCount: number
  isLikable: boolean
  rate: number
  date?: string | Date
  profileImage?: string
  commentId: number
  impression_of_the_caller: null | 'like' | 'dislike'
  imageList: {
    imageUrl: string
    alt: string
  }[]
}

const Button = styled(MuiButton)({
  padding: 0,
})

const IconButton = styled(MuiIconButton)({
  padding: 0,
})

type Props = Omit<UserInfoSectionProps, 'imageUrl' | 'count'> & CommentProp
export const Comment = ({
  date,
  dislikeCount,
  imageList,
  isLikable,
  likeCount,
  name,
  text,
  rate,
  profileImage,
  commentId,
  author_member_id,
  impression_of_the_caller,
  resort_id,
}: Props) => {
  const {data, refetch} = useScrollBasedInfiniteQuery<BaseResponseType<CommentResponse[]>['data']>()

  const pageIndex = data?.pages.findIndex((item) => item?.result.find((comment) => comment.comment_id === commentId)) ?? 0
  const {mutateAsync, isLoading: isLikingOrDisliking, data: LikingOrDislikingData} = useMutation(likeOrDislikeCommentMutation)
  const {mutateAsync: deleteCommentMutationAsync, status: deleteCommentStatus, data: deleteCommentData} = useMutation(deleteCommentMutation)
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const {showSnackbar} = useSnackbar()
  const {user} = useUserProfile()
  const [isNewBadgeModalShown, setIsNewBadgeModalShown] = useState(false)

  const checkIskUserLoggedIn = () => {
    if (!user) {
      navigate({pathname: '/login', search: `returnUrl=${location.pathname}${encodeURIComponent(location.search)}`}, {replace: true})
    }
  }

  const removeComment = () => {
    deleteCommentMutationAsync({commentId: commentId.toString()})
      .then((res) => {
        if (res) {
          showSnackbar(t`Comment has been removed. Thank you.`)
          window.location.reload()
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

  const ownComment = (user && user.member_id === author_member_id) ?? false

  const shouldShow =
    deleteCommentStatus === 'idle' || deleteCommentStatus !== 'success' || (deleteCommentStatus === 'success' && !deleteCommentData)
  return shouldShow ? (
    <Stack
      py={theme.spacing(1.5)}
      sx={{borderBottom: `1px solid ${theme.palette.grey[300]}`, cursor: 'pointer'}}
      onClick={() => {
        navigate(`/things/${resort_id}`)
      }}
    >
      <Stack display="flex" direction="row" justifyContent="space-between">
        <Stack alignItems="center" flexDirection="row">
          <UserInfoSection
            subtitle={formatDate(date, 'monthAndYear')}
            imageUrl={profileImage}
            name={name}
            userId={author_member_id?.toString() ?? ''}
          />
        </Stack>
        <Stack alignItems="center" justifyContent="center">
          <Stack flexDirection={'row'}>
            {/* <IconButton size="large">
              <Flag />
            </IconButton> */}
            {ownComment ? (
              <IconButton size="large" onClick={removeComment}>
                <Cancel width="30px" height="30px" />
              </IconButton>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      <Stack py={1}>
        <RateIcon rate={rate} />
      </Stack>
      <Stack>
        <Button
          fullWidth
          variant="text"
          // onClick={() => {
          //   navigate(`/things/${resort_id}`)
          // }}
          sx={{justifyContent: 'flex-start'}}
        >
          <Typography variant="caption" color="shades.9" py={1} textAlign="right" sx={{textAlign: 'right'}}>
            {text}
          </Typography>
        </Button>
      </Stack>

      <Grid py={1} container spacing={0.5}>
        {imageList.map((item, i) => (
          <Grid item xs={4} key={i}>
            <img alt={item.alt} src={item.imageUrl} width="100%" />
          </Grid>
        ))}
      </Grid>
      <Stack py={1}>
        <Grid container spacing={2} sx={isLikingOrDisliking ? {opacity: 0.5} : undefined}>
          <Grid item xs={8} sm={8}>
            {isLikable ? (
              <Typography variant="subtitle1" color="shades.7">
                <Trans>Was it useful?</Trans>
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={2} sm={2}>
            <Stack direction="row">
              <Button
                endIcon={impression_of_the_caller === 'dislike' ? <DislikeFilled /> : <Dislike />}
                sx={{padding: 0}}
                size="large"
                disabled={ownComment || isLikingOrDisliking}
                onClick={() => {
                  checkIskUserLoggedIn()
                  mutateAsync({
                    commentId: commentId.toString(),
                    data: {status: 0},
                  }).then((res) => {
                    if ((res?.badge_list?.length ?? -1) > 0) {
                      setIsNewBadgeModalShown(true)
                    } else {
                      refetch({refetchPage: (_, index) => index === pageIndex})
                    }
                  })
                }}
              >
                <Typography color={theme.palette.error.main}>{dislikeCount}</Typography>
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Stack direction="row">
              <Button
                endIcon={impression_of_the_caller === 'like' ? <GreenLikeFilled /> : <GreenLike />}
                size="large"
                disabled={ownComment || isLikingOrDisliking}
                onClick={() => {
                  checkIskUserLoggedIn()
                  mutateAsync({
                    commentId: commentId.toString(),
                    data: {status: 1},
                  }).then((res) => {
                    if (res?.badge_list?.length ?? -1 > 0) {
                      setIsNewBadgeModalShown(true)
                    } else {
                      refetch({refetchPage: (_, index) => index === pageIndex})
                    }
                  })
                }}
              >
                <Typography color={theme.palette.success.main}>{likeCount}</Typography>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      {isNewBadgeModalShown && (
        <NewBadge
          close={() => {
            refetch({refetchPage: (_, index) => index === pageIndex})
            setIsNewBadgeModalShown(false)
          }}
          medalName={(LikingOrDislikingData?.badge_list ?? [])[0]?.medal ?? ''}
          memberName={user?.name ?? ''}
        />
      )}
    </Stack>
  ) : null
}
