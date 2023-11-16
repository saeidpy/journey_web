import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {Suspense} from 'react'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {Header} from 'src/shared/layouts/app-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {MedalGuideSection} from './MedalGuidSection'

export default function MedalGuidPage() {
  return (
    <>
      <Header hasBackButton={true} title={t`Get medal guide`} fullWidth />
      <Stack py={2}>
        <ErrorBoundary fallback={<FullPageError />}>
          <Suspense fallback={<FullScreenLoading />}>
            <MedalGuideSection />
          </Suspense>
        </ErrorBoundary>
      </Stack>
    </>
  )
}
