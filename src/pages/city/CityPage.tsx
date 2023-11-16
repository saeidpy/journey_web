import {Suspense} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {CityInfo} from './CityInfo'
import {CityResidences} from './CityResidences'
import {CityRestaurants} from './CityRestaurants'
import {CityTourismEntities} from './CityTourismEntities'

export default function CityPage() {
  const {id = ''} = useParams<{id: string}>()
  const navigate = useNavigate()
  if (!id) {
    navigate({pathname: '/'}, {replace: true})
  }
  return (
    <>
      <ErrorBoundary fallback={<FullPageError />}>
        <Suspense fallback={<FullScreenLoading />}>
          {id ? (
            <>
              <CityInfo cityId={id} />
              <CityTourismEntities cityId={id} />
              <CityResidences cityId={id} />
              <CityRestaurants cityId={id} />
            </>
          ) : null}
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
