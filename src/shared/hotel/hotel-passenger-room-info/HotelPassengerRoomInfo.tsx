import {Stack} from '@mui/material'
import {HotelPassengerInfoCard} from './HotelPassengerInfoCard'
interface HotelPassengerRoomInfoProps {
  hotelTitle: string
  rooms: {
    child: number
    adult: number
    roomTitle: string
    roomNumber?: number
  }[]
}
export const HotelPassengerRoomInfo = ({rooms, hotelTitle}: HotelPassengerRoomInfoProps) => {
  return (
    <Stack gap={2.5} mb={2}>
      {/* <Typography variant="h6">
        <Trans>room and passenger info</Trans>
      </Typography> */}
      <Stack gap={3}>
        {rooms.map((item: any, index: any) => (
          <HotelPassengerInfoCard
            roomNumber={item.roomNumber ?? index}
            // roomTitle={item.roomTitle}
            roomTitle={item.roomTitle}
            hotelTitle={hotelTitle}
            adultCount={item.adult}
            childCount={item.child ?? 0}
          />
        ))}
      </Stack>
    </Stack>
  )
}
