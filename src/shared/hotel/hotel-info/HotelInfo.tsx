import {Trans} from '@lingui/macro'
import {Stack, Typography} from '@mui/material'
import {Location, StarIcon} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {HotelInfoMuiCard} from '../hotel-passenger-room-info/HotelPassengerInfoCard'
interface HotelInfoProps {
  hotelTitle: string
  starCount: number
  address: string
  enterDate: string
  exitDate: string
  stayingTime: number
  roomCount: number
  withoutChangeRoomButton?: boolean
  onClickAction?: () => void
}
export const HotelInfo = ({
  hotelTitle,
  starCount,
  address,
  enterDate,
  exitDate,
  stayingTime,
  roomCount,
  withoutChangeRoomButton,
  onClickAction,
}: HotelInfoProps) => {
  return (
    <HotelInfoMuiCard>
      {!withoutChangeRoomButton && (
        <Button variant="outlined" fullWidth color="inherit" onClick={onClickAction}>
          <Trans>change room</Trans>
        </Button>
      )}
      <Stack flexDirection={'row'} justifyContent="space-between">
        <Typography variant="h6">{hotelTitle}</Typography>
        <Typography display={'flex'} alignItems="center" gap={0.5}>
          {starCount}
          <StarIcon />
        </Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={0.5}>
        <Location fontSize={'50px'} fontSizeAdjust={20} />
        <Typography>{address}</Typography>
      </Stack>
      <Stack gap={1}>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>enter:</Trans>
          </Typography>
          {enterDate}
        </Typography>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>exit:</Trans>
          </Typography>
          {exitDate}
        </Typography>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>staying time:</Trans>
          </Typography>
          {stayingTime && <Trans>{stayingTime} day</Trans>}
        </Typography>
        <Typography display={'flex'} gap={1}>
          <Typography color="InactiveCaptionText">
            <Trans>number of rooms:</Trans>
          </Typography>
          <Trans>{roomCount} room</Trans>
        </Typography>
      </Stack>
    </HotelInfoMuiCard>
  )
}
