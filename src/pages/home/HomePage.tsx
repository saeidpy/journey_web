import {Trans} from '@lingui/macro'
import {Typography} from '@mui/material'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
// import {HomePageEntities} from './HomePageEntities'
import {HomePageEntities2} from './HomePageEntities2'
import {HomepageHeader} from './HomepageHeader'

export default function HomePage() {
  return (
    <>
      <HomepageHeader />
      <Typography variant="h1" mb={1} mt={2}>
        <Trans>Most Viewed Destinations</Trans>
      </Typography>
      <ErrorBoundary fallback={<FullPageError />}>
        <HomePageEntities2 />
      </ErrorBoundary>
    </>
  )
}
