import {Suspense} from 'react'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FullScreenLoading} from 'src/shared/loading'
import {PointsSection} from './PointsSection'

export interface PointsTabProps {
  score: number
  isSelf?: boolean
  name?: string
}

export const PointsTab = ({score, isSelf, name}: PointsTabProps) => {
  return (
    <ErrorBoundary fallback={<FullPageError />}>
      <Suspense fallback={<FullScreenLoading />}>
        <PointsSection score={score} isSelf={isSelf} name={name} />
      </Suspense>
    </ErrorBoundary>
  )
}
