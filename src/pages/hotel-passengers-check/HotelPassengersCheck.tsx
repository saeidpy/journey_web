import {t} from '@lingui/macro'
import {differenceInDays} from 'date-fns'
import {useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {
  ActionButton,
  ActionButtonHotel,
  ContentRegionHotel,
  HotelInfo,
  HotelPassengerRoomCheck,
  HotelPassengersLayout,
} from 'src/shared/hotel'

export default function HotelPassengersCheck() {
  const {
    bookHotel: {count, rangeDate, selectedRoom, passengers},
  } = useBookHotel()
  const daysDifference = differenceInDays(new Date(rangeDate?.[0] ?? ''), new Date(rangeDate?.[1] ?? ''))

  const onAction = () => {}

  const rooms = Object.entries(passengers ?? {})
    .map((item) => Object.entries(item[1]).map(([typePassenger, passenger]) => passenger.map((item) => ({...item, typePassenger}))))
    .map((item, index) => ({passengers: item.flatMap((item) => item), roomTitle: selectedRoom?.roomName, roomNumber: index}))

  return (
    <HotelPassengersLayout headerTitle={t`Confirm information`}>
      <ContentRegionHotel>
        <HotelInfo
          withoutChangeRoomButton
          hotelTitle={selectedRoom?.hotelName ?? ''}
          starCount={4}
          address={selectedRoom?.address ?? ''}
          enterDate={rangeDate?.[0] ?? ''}
          exitDate={rangeDate?.[1] ?? ''}
          stayingTime={daysDifference ? daysDifference : 1}
          roomCount={count?.length ? count?.length : 1}
        />
        <HotelPassengerRoomCheck rooms={rooms as any} />
      </ContentRegionHotel>
      <ActionButtonHotel>
        <ActionButton totalPrice={selectedRoom?.pricePerNight ?? 0} onClick={onAction} />
      </ActionButtonHotel>
    </HotelPassengersLayout>
  )
}
