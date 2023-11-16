import {Trans} from '@lingui/macro'
import {Typography} from '@mui/material'
import {Suspense} from 'react'
import {Link} from 'react-router-dom'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {AppAuthLayout, ContentRegion, FooterRegion} from 'src/shared/layouts/app-auth-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {AuthRoutes} from './AuthRoutes'

export function AuthContainer() {
  return (
    <AppAuthLayout>
      {/* <HeaderRegion>
        <Logo />
      </HeaderRegion> */}
      <ContentRegion>
        <ErrorBoundary fallback={<FullPageError />}>
          <Suspense fallback={<FullScreenLoading />}>
            <AuthRoutes />
          </Suspense>
        </ErrorBoundary>
      </ContentRegion>
      <FooterRegion>
        <Typography variant="subtitle1">
          <Trans>
            I accept all the <Link to="/terms">rules and regulations</Link>.
          </Trans>
        </Typography>
      </FooterRegion>
    </AppAuthLayout>
  )
}
