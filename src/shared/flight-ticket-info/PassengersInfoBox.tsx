import {Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {User} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {Tag} from 'src/shared/label'

type PassengerInfoType = {
  fullName: string
  gender: string
  identityNumber: string
  birthDate: string
  nationality?: string
  ageCategory: string
}
type PassengersInfoBoxType = {
  passengers: PassengerInfoType[]
  onBack: () => void
}

const Wrapper = styled(Stack)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.shades[3]}`,
  padding: theme.spacing(2, 1),
}))
const Row = styled(Stack)(({theme}) => ({
  flexDirection: 'row',
  padding: theme.spacing(1, 0),
  justifyContent: 'space-between',
}))

const PassengerInfoBox = (props: PassengerInfoType) => {
  return (
    <Wrapper>
      <Row>
        <Stack>
          <Tag>{props.ageCategory}</Tag>
        </Stack>
      </Row>
      <Row>
        <Stack>
          <Typography variant="h3" color="shades.9">
            <Trans>FullName</Trans>:
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body1" color="shades.9">
            {props.fullName}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack>
          <Typography variant="h3" color="shades.9">
            <Trans>Gender</Trans>:
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body1" color="shades.9">
            {props.gender}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack>
          <Typography variant="h3" color="shades.9">
            <Trans>National/Passport number</Trans>:
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body1" color="shades.9">
            {props.identityNumber}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack>
          <Typography variant="h3" color="shades.9">
            <Trans>BirthDate</Trans>:
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body1" color="shades.9">
            {props.birthDate}
          </Typography>
        </Stack>
      </Row>
      {props.nationality ? (
        <Row>
          <Stack>
            <Typography variant="h3" color="shades.9">
              <Trans>Nationality</Trans>:
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body1" color="shades.9">
              {props.nationality}
            </Typography>
          </Stack>
        </Row>
      ) : null}
    </Wrapper>
  )
}
export const PassengersInfoBox = ({onBack, passengers}: PassengersInfoBoxType) => {
  return (
    <Stack py={2}>
      <Stack flexDirection="row">
        <Stack flex={0.5} justifyContent="center">
          <User width={24} height={24} />
        </Stack>
        <Stack justifyContent="center" flex={3}>
          <Typography variant="h2" color="shades.9">
            <Trans>Passengers information</Trans>
          </Typography>
        </Stack>
        <Stack flex={3}>
          <Button variant="text" onClick={onBack}>
            <Trans>Edit passengers information</Trans>
          </Button>
        </Stack>
      </Stack>
      {passengers.map((item, index) => (
        <PassengerInfoBox key={index} {...item} />
      ))}
    </Stack>
  )
}
