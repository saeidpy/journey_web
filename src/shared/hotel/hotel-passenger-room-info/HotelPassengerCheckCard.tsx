import {t, Trans} from '@lingui/macro'
import {Card, Stack, styled, Typography} from '@mui/material'
//import {useNavigate} from 'react-router'
import {Button} from 'src/shared/button'
import {useHandleBack} from 'src/shared/layouts/app-layout'

export const HotelInfoMuiCard = styled(Card)(({theme}) => ({
  padding: theme.spacing(3, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  boxShadow: '0px 0px 4px 0px ' + theme.palette.divider,
}))

const StackField = styled(Stack)(({theme}) => ({
  background: theme.palette.shades[2.5],
  flex: 1,
  alignItems: 'center',
  padding: theme.spacing(1),
}))
export type PassengerType = {fullName: string; gender: string; nationalCode: string; typePassenger: 'adult' | 'child'}

interface HotelPassengerInfoCardProps {
  roomNumber: number
  roomTitle: string
  passengers: PassengerType[]
}

const PassengerInfoInput = ({passenger}: {passenger: PassengerType}) => {
  // const navigate = useNavigate()
  const labels = {
    fullName: t`FullName`,
    nationalCode: t`National Code`,
    typePassenger: t`ُType Passenger`,
  }
  const typePassenger = {
    adult: t`Adult`,
    child: t`Child`,
  }

  // const onClick = () => {
  //   //TODO: going back to edit passenger count
  //   navigate('/hotel/hotel-information')
  // }
  const handleBackButton = useHandleBack()
  return (
    <Stack gap={2.5}>
      <Stack gap={0.5}>
        {Object.entries(labels).map(([field, label]) => (
          <Stack gap={0.5} flexDirection="row" justifyContent={'space-evenly'} alignItems="center">
            <StackField>
              <Typography variant="body1" fontWeight={400}>
                {label}
              </Typography>
            </StackField>
            <StackField>
              {field === 'typePassenger' ? (
                <Typography variant="caption">{typePassenger[passenger[field]]}</Typography>
              ) : (
                <Typography variant="caption">{passenger[field as keyof PassengerType]}</Typography>
              )}
            </StackField>
          </Stack>
        ))}
      </Stack>
      {/* <Button fullWidth variant="outlined" onClick={onClick}> */}
      <Button fullWidth variant="outlined" onClick={() => handleBackButton()}>
        <Trans>Edit Profile</Trans>
      </Button>
    </Stack>
  )
}
const roomTexts: any = {
  '1': t`first`,
  '2': t`second`,
  '3': t`third`,
  '4': t`fourth`,
  '5': t`fifth`,
  '6': t`sixth`,
  '7': t`seven`,
  '8': t`eight`,
  '9': t`nine`,
  '10': t`ten`,
}
export const HotelPassengerCheckCard = ({roomNumber, roomTitle, passengers}: HotelPassengerInfoCardProps) => {
  return (
    <HotelInfoMuiCard>
      <Stack gap={4}>
        <Typography variant="h6">
          <Trans>room {roomTexts[roomNumber + 1]}:</Trans>
          {roomTitle}
        </Typography>
        {passengers?.map((item, index) => (
          <PassengerInfoInput passenger={item} />
        ))}
      </Stack>
    </HotelInfoMuiCard>
  )
}
