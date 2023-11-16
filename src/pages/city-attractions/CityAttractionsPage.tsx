import {Trans} from '@lingui/macro'
import {Typography, useTheme} from '@mui/material'
import {Suspense} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Cart} from 'src/shared/cart'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {ResortTypeEnum} from 'src/shared/types/server'
import {AttractionsSection} from './AttractionsSection'
import {CityAttractionHeader} from './CityAttractionHeader'
import {MostPopularSection} from './MostPopularSection'

export default function CityAttractionsPage() {
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const cityId = location.state?.cityId
  const resortType = location.state?.resortType
  const resortType_fn =
    resortType === ResortTypeEnum.RESTAURANT
      ? 'رستوران‌های برگزیده'
      : resortType === ResortTypeEnum.RESIDENCE
      ? 'اقامتگاه‌های برگزیده'
      : 'جاذبه‌های برگزیده'
  const pageTitle = `${resortType_fn.split('های')[0]} در ${location.state?.city_name_fa}`

  if (!location.state) {
    navigate({pathname: '/'}, {replace: true})
  }
  return (
    <>
      <CityAttractionHeader title={pageTitle} hasBackButton />
      <ErrorBoundary fallback={<></>}>
        <Suspense fallback={<FullScreenLoading />}>
          <MostPopularSection
            showAll={() => {
              navigate(
                {pathname: 'most-popular'},
                {state: {cityId: cityId, resortType: resortType, city_name_fa: location.state?.city_name_fa, title: pageTitle}}
              )
            }}
            title={resortType_fn}
            Component={Cart}
            resortType={resortType}
            cityId={cityId}
          />
        </Suspense>
      </ErrorBoundary>

      <Typography variant="h4" sx={{padding: theme.spacing(2, 0)}}>
        <Trans>The most visited destinations</Trans>
      </Typography>
      {location.state && (
        <ErrorBoundary fallback={<></>}>
          <Suspense fallback={<FullScreenLoading />}>
            <AttractionsSection cityId={cityId} resortType={resortType} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  )
}
