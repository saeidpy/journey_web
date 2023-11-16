import {Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {LeftArrow} from 'src/assets/icons'
import {MenuButton} from 'src/shared/button'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {Map} from 'src/shared/map'
import {RateReverse} from 'src/shared/rate'
import {FlatFullWidthSlideContainer} from 'src/shared/slider-container'
import {ResortResponseItem} from 'src/shared/types/server'
import {getGeoPointFromLocationResponse} from 'src/shared/utils/getGeoPointFromLocationResponse'
import {resortInfoQuery} from '../things/resortInfo.query'
import {ThingsRelatedLocation} from '../things/ThingsRelatedLocation'
import {AboutHotel} from './AboutHotel'
import {HotelCommentSection} from './HotelCommentSection'
// import { t, Trans } from '@lingui/macro'
// import HotelRoomSelectionSection from './HotelRoomSelectionSection'
// import { noContent } from 'src/assets/img'
// import {HotelBookData} from './HotelBookData'
const HotelDetailsPageContainer = styled('div')(({theme}) => ({
  margin: theme.spacing(-2),
  paddingBottom: theme.spacing(2),
}))

const RelativeStack = styled(Stack)({
  position: 'relative',
})

//todo : After the arrival of APIs, this section will be modified

// const CentricWrapper = styled(Stack)(({ theme }) => ({
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: theme.spacing(2, 0),
//   textAlign: 'center',
// }))

// const CustomFallback = ({ error }: { error: Error | null }) => {
//   if (error) {
//     // if (error && error.message.includes('400')) {
//     return (
//       <>
//         <CentricWrapper px={1}>
//           <CentricWrapper>
//             <img alt={t`No result content.`} src={noContent} width="100%" />
//           </CentricWrapper>
//           <CentricWrapper>
//             <Typography variant="caption" width="277px" height="38px" textAlign="center">
//               <Trans>There is no available room in your selected time frame, choose another date</Trans>
//             </Typography>
//           </CentricWrapper>
//         </CentricWrapper>
//       </>
//     )
//   }

//   return <div>Something went wrong</div>
// }

export default function HotelDetailsPage() {
  const {id = ''} = useParams<{id: string}>()
  const resort = useLocation()?.state?.resort as ResortResponseItem
  const navigate = useNavigate()
  const handleBackButton = useHandleBack()
  const {data, isSuccess} = useQuery(['ThingsPage', id], resortInfoQuery, {
    placeholderData: resort,
    staleTime: 0,
  })

  if (isSuccess) {
    const geoPoint = getGeoPointFromLocationResponse(data?.location)

    return (
      <>
        <HotelDetailsPageContainer>
          <RelativeStack>
            {data && (
              <FlatFullWidthSlideContainer
                onClick={() => {
                  navigate(`/things/${id}/things-photos`)
                }}
                noPadding
                list={data.media_list ?? []}
              />
            )}

            <MenuButton variant="contained" onClick={handleBackButton}>
              <LeftArrow />
            </MenuButton>
          </RelativeStack>
          <Stack justifyContent="space-between" px={2}>
            <Stack flexDirection="row" justifyContent="space-between">
              <Stack py={1} alignItems="flex-start">
                <Typography variant="h3" mt={2}>
                  {data?.name_fa}
                </Typography>
              </Stack>
              <Stack py={1} alignItems="flex-end" mt={2}>
                <Stack flexDirection="row" justifyContent="center" alignItems="center">
                  {/* <StarBox flexDirection={'row'} justifyContent="center" alignItems="center" width="fit-content">
                    <Stack px={0.5} justifyContent="center" alignItems="center">
                      <ContainedStar />
                    </Stack>
                    <Typography variant="h3" color="main.primary3">
                      {4} <Trans>star</Trans>
                    </Typography>
                  </StarBox> */}
                </Stack>
              </Stack>
            </Stack>
            <Stack py={1} justifyContent={'flex-start'}>
              <Stack direction={'row'}>
                <RateReverse count={data ? data.comment_count : 0} rate={data?.total_popularity_score} />
              </Stack>
            </Stack>
            <Stack py={1}>{geoPoint?.lat && geoPoint?.lon ? <Map lat={geoPoint.lat} lng={geoPoint.lon} /> : null}</Stack>
            {/* //todo : After the arrival of APIs, this section will be modified */}
            {/* <Stack mt={2}>
              <Typography variant="h3">
                <Trans>Rooms</Trans>
              </Typography>
            </Stack> */}
            {/* <Stack py={2}>
              <HotelBookData />
            </Stack> */}

            {/* <ErrorBoundary fallbackRender={({error}) => <CustomFallback error={error} />}>
              <Suspense fallback={<FullScreenLoading />}>
                <Stack py={1}>
                  <HotelRoomSelectionSection />
                </Stack>
              </Suspense>
            </ErrorBoundary> */}

            {/* <Stack>
              <Rules entranceTime="14:00" exitTime="16:00" />
            </Stack> */}
            <Stack>
              <AboutHotel
                description={data?.description}
                navigate={() => navigate({pathname: `/things/${data?.resort_id}/things-explanation`}, {state: {resort: data}})}
              />
            </Stack>

            <Stack>{data && <HotelCommentSection data={data} />}</Stack>
            {data && (
              <Stack>
                <ErrorBoundary fallback={<></>}>
                  <Suspense fallback={<FullScreenLoading />}>
                    <ThingsRelatedLocation />
                  </Suspense>
                </ErrorBoundary>
              </Stack>
            )}
          </Stack>
        </HotelDetailsPageContainer>
      </>
    )
  } else {
    return null
  }
}
