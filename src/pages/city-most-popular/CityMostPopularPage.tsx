import {Trans} from '@lingui/macro'
import {Typography, useTheme} from '@mui/material'
import {Suspense} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {CityMostPopularHeader} from './CityMostPopularHeader'
import {ResortListSection} from './ResortListSection'

export default function CityMostPopularPage() {
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const cityId = location.state?.cityId
  const resortType = location.state?.resortType
  const title = location.state?.title

  if (!location.state) {
    navigate({pathname: '/'}, {replace: true})
  }
  return (
    <>
      <CityMostPopularHeader title={title} hasBackButton />
      <Typography variant="h4" sx={{padding: theme.spacing(2, 0)}}>
        <Trans>The most visited destinations</Trans>
      </Typography>
      {location.state && (
        <ErrorBoundary fallback={<></>}>
          <Suspense fallback={<FullScreenLoading />}>
            <ResortListSection cityId={cityId} resortType={resortType} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  )
}
