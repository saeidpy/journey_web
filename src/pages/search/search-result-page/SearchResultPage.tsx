import {Stack} from '@mui/material'
import {Suspense} from 'react'
import {useLocation} from 'react-router-dom'
import {SearchBarButton} from 'src/pages/home/HomepageHeader'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {parseParamQuery} from 'src/shared/utils/paramQuery'
import {ResultSection} from './ResultSection'

export default function SearchResultPage() {
  const {search} = useLocation()
  const back = useHandleBack()
  const searchTerm = window.decodeURIComponent(parseParamQuery(search)?.q ?? '')
  const filter = window.decodeURIComponent(parseParamQuery(search)?.filter ?? '')

  if (!searchTerm) {
    back()
  }

  return (
    <>
      <Stack width="100%">
        <SearchBarButton defaultText={searchTerm || undefined} hasBack />
        <ErrorBoundary fallback={<FullPageError />}>
          <Suspense fallback={<FullScreenLoading />}>
            <ResultSection filter={filter} searchTerm={searchTerm ?? ''} />
          </Suspense>
        </ErrorBoundary>
      </Stack>
    </>
  )
}
