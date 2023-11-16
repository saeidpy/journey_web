import {t, Trans} from '@lingui/macro'
import {Stack, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {Suspense, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Location} from 'src/assets/icons'
import {coverPng, profileJpg} from 'src/assets/img'
import {useUserProfile} from 'src/core/auth'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {CommentsTab} from './CommentsTab'
import PhotosTab from './PhotosTab'
import {PointsTab} from './PointsTab'
import {profileQuery} from './profile.query'
import {ProfileHeaderWithCover} from './ProfileHeaderWithCover'
import {ProfileMenu} from './ProfileMenu'
import {ProfileTabs} from './ProfileTaps'

export default function ProfilePage() {
  const {id = ''} = useParams<{id: string}>()
  const {user} = useUserProfile()
  const {data, refetch} = useQuery(['ProfilePage', id], profileQuery, {
    placeholderData: user,
    staleTime: 0,
  })
  useEffect(() => {
    refetch()
  }, [user, refetch])
  const score = data?.score ?? 0
  const isSelf = !id || id === user?.member_id?.toString()
  return (
    <>
      <ProfileHeaderWithCover
        hasFeedbackButton={isSelf}
        hasBackButton={false}
        isPhotoChangeable={false}
        coverAlt={data?.name ?? 'Cover'}
        coverSrc={data?.cover_picture?.url ?? coverPng}
        profileSrc={data?.profile_picture?.url ?? profileJpg}
      />
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Typography variant="body1" color="shades.9">
          {data?.name}
        </Typography>
      </Stack>
      <Typography py={1} color="shades.9" variant="body1">
        <Trans>
          {isSelf ? t`Your` : data?.name} points: {score}
        </Trans>
      </Typography>
      <Stack py={1} flexDirection={'row'} alignItems={'center'}>
        {data?.living_city?.city_name_fa ? (
          <>
            <Location />
            <Typography py={1} color="shades.7" variant="body1">
              {data?.living_city?.city_name_fa}
            </Typography>
          </>
        ) : (
          ''
        )}
      </Stack>
      <Typography variant="body1" color="shades.9">
        {data?.description}
      </Typography>
      {isSelf ? (
        <>
          <ProfileMenu />
        </>
      ) : null}
      <ProfileTabs
        tabList={[
          {
            label: t`Points`,
            content: (
              <ErrorBoundary fallback={<FullPageError />}>
                <Suspense fallback={<FullScreenLoading />}>
                  <PointsTab score={score} isSelf={isSelf} name={data?.name ?? undefined} />
                </Suspense>
              </ErrorBoundary>
            ),
          },
          {
            label: t`Photos`,
            content: <PhotosTab memberId={id} initialMedia={data?.resort_pic_by_me} />,
          },
          {
            label: t`Comments`,

            content: (
              <ErrorBoundary fallback={<FullPageError />}>
                <Suspense fallback={<FullScreenLoading />}>
                  <CommentsTab profileId={id} />
                </Suspense>
              </ErrorBoundary>
            ),
          },
        ]}
      />
    </>
  )
}
