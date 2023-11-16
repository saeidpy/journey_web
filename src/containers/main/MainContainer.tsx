import {Suspense} from 'react'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {AppLayout, BottomNavigation, BottomNavigationRegion, ContentRegion} from 'src/shared/layouts/app-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {ModalSheetProvider} from 'src/shared/modal-sheet'
import {MainRoutes} from './MainRoutes'

export function MainContainer() {
  return (
    <AppLayout>
      <ContentRegion>
        <ErrorBoundary fallback={<FullPageError />}>
          <Suspense fallback={<FullScreenLoading />}>
            <ModalSheetProvider>
              <MainRoutes />
            </ModalSheetProvider>
          </Suspense>
        </ErrorBoundary>
      </ContentRegion>
      <BottomNavigationRegion>
        <BottomNavigation />
      </BottomNavigationRegion>
    </AppLayout>
  )
}
