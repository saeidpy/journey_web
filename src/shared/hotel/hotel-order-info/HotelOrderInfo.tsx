import {Trans} from '@lingui/macro'
import {Stack, Typography} from '@mui/material'
import {ReactElement} from 'react'
import {HotelInfoMuiCard} from '../hotel-passenger-room-info/HotelPassengerInfoCard'

interface HotelOrderInfoProps {
  reservationNumber: string
  booker: string
  timePurchase: string
  reservationStatus: ReactElement
}
export const HotelOrderInfo = ({reservationNumber, booker, timePurchase, reservationStatus}: HotelOrderInfoProps) => {
  return (
    <HotelInfoMuiCard>
      <Stack gap={1}>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>Reservation number:</Trans>
          </Typography>
          {reservationNumber}
        </Typography>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>booker:</Trans>
          </Typography>
          {booker}
        </Typography>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>Purchase time:</Trans>
          </Typography>
          {timePurchase}
        </Typography>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>Reservation status:</Trans>
          </Typography>
          {reservationStatus}
        </Typography>
      </Stack>
    </HotelInfoMuiCard>
  )
}
