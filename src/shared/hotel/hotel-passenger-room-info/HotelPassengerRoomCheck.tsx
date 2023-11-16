import {Trans} from '@lingui/macro'
import {Stack, Typography} from '@mui/material'
import {HotelPassengerCheckCard, PassengerType} from './HotelPassengerCheckCard'

interface HotelPassengerRoomInfoProps {
  rooms: {passengers: PassengerType[]; roomTitle: string; roomNumber?: number}[]
}

export const HotelPassengerRoomCheck = ({rooms}: HotelPassengerRoomInfoProps) => {
  return (
    <Stack gap={2.5}>
      <Typography variant="h6">
        <Trans>room and passenger info</Trans>
      </Typography>
      <Stack gap={3}>
        {rooms.map((item, index) => (
          <HotelPassengerCheckCard roomNumber={index} roomTitle={item.roomTitle} passengers={item.passengers} />
        ))}
      </Stack>
    </Stack>
  )
}
