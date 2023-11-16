import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {Header} from 'src/shared/layouts/app-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {PlaceExplanation} from 'src/shared/place-explanation-box'
import {ResortResponseItem} from 'src/shared/types/server'

export default function PlaceExplanationPage() {
  const {id = ''} = useParams<{id: string}>()
  const navigate = useNavigate()
  const resort = useLocation()?.state?.resort as ResortResponseItem | undefined | null

  if (!id) {
    navigate({pathname: '/'}, {replace: true})
  }
  return (
    <>
      <Header hasBackButton onShare={() => {}} title={resort?.name_fa} fullWidth />
      <ErrorBoundary fallback={<></>}>
        <Suspense fallback={<FullScreenLoading />}>
          <PlaceExplanation resort={resort} id={id} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
