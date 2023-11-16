import {t} from '@lingui/macro'
import {Suspense} from 'react'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {RelatedHeader} from './RelatedHeader'
import {RelatedPageEntities} from './RelatedPageEntities'

function RelatedPage() {
  return (
    <>
      <RelatedHeader title={t`Related location`} hasBackButton />
      <ErrorBoundary fallback={<FullPageError />}>
        <Suspense fallback={<FullScreenLoading />}>
          <RelatedPageEntities />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default RelatedPage
