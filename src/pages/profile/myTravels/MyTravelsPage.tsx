import {t} from '@lingui/macro'
import {useQuery} from '@tanstack/react-query'
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Bag} from 'src/assets/icons'
import {FullPageError} from 'src/shared/error'
import {TitleAndIconHeader} from 'src/shared/layouts/app-layout/TitleAndIconHeader'
import {FullScreenLoading} from 'src/shared/loading'
import {TravelHistoryBox} from 'src/shared/travels/TravelHistoryBox'
import {MyTripsType, TravelStatusEnum} from 'src/shared/types/server'
import {myTripQuery} from './myTrip.query'
export default function MyTravelsPage() {
  const {
    data,
    //  isLoading,
    // isFetched
  } = useQuery(['myTrips'], myTripQuery)
  //todo
  //@ts-ignore
  const trips: MyTripsType[] = data?.result?.trips
  return (
    <>
      <TitleAndIconHeader title={t`My travels`} hasBackButton icon={<Bag />} />
      <ErrorBoundary fallback={<FullPageError />}>
        <Suspense fallback={<FullScreenLoading />}>
          {/* <ScrollBasedInfiniteQuery noResult={<NoContent />} queryFn={myTripQuery} queryKey={['myTrips']} selectData={singleTrip} /> */}
          {trips.map((item) => (
            <TravelHistoryBox
              bookNumber={item.book_unique_id}
              buyingDate={new Date(item.created_at.split(' ')[0]).toLocaleDateString('fa-IR')}
              travelType={item.ticket_variety_type[1][0]}
              status={TravelStatusEnum.PAID}
              price={item.total_price}
            />
          ))}
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
