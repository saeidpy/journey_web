import {Suspense} from 'react'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {SearchSection} from './SearchSection'

export default function SearchPage() {
  return (
    <ErrorBoundary fallback={<FullPageError />}>
      <Suspense fallback={<FullScreenLoading />}>
        <SearchSection />
      </Suspense>
    </ErrorBoundary>
  )
}
