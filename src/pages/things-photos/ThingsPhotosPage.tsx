import {Suspense} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {Header, useHandleBack} from 'src/shared/layouts/app-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {ResortResponseItem} from 'src/shared/types/server'
import {ThingsPhotosSection} from './ThingsPhotosSection'

export default function ThingsPhotosPage() {
  const {id} = useParams<{id: string}>()
  const back = useHandleBack()
  const thingData = useLocation()?.state?.resort as ResortResponseItem
  if (!id) {
    back()
    return null
  }

  return (
    <>
      <Header title={thingData?.name_fa} hasBackButton fullWidth />
      <ErrorBoundary fallback={<FullPageError />}>
        <Suspense fallback={<FullScreenLoading />}>
          <ThingsPhotosSection resortId={id} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
