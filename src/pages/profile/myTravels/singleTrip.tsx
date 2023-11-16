import {TravelHistoryBox} from 'src/shared/travels/TravelHistoryBox'
import {TravelStatusEnum} from 'src/shared/types/server'
import {MyTripsType} from 'src/shared/types/server/flight/MyTripsResponseType'

export const singleTrip = (item: MyTripsType, key: React.Key | null) => (
  <TravelHistoryBox
    bookNumber={item.book_unique_id}
    buyingDate={new Date(item.created_at.split(' ')[0]).toLocaleDateString('fa-IR')}
    travelType={item.ticket_variety_type[1][0]}
    status={TravelStatusEnum.PAID}
    price={item.total_price}
  />
)
