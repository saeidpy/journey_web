import {Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {Airplane, Pencil} from 'src/assets/icons'
import {flightLogo} from 'src/assets/img'
import {Button} from 'src/shared/button'
import {Wrapper} from './FlightFormWrapper'
import {FlightTicketInfoBoxType} from './FlightTicketInfoBox'

const CentricBox = styled(Stack)({
  justifyContent: 'center',
  alignItems: 'center',
})

export const SelectedFlightTicketInfoBox = (props: FlightTicketInfoBoxType) => {
  return (
    <Wrapper>
      <Stack flex={1} flexDirection="row" pt={1}>
        <CentricBox flex={1} p={0.5}>
          <img width="70%" src={flightLogo} alt={props.flightName} />
        </CentricBox>
        <Stack flex={2} justifyContent="center">
          <Typography variant="h2">{props.flightName}</Typography>
        </Stack>
        <CentricBox flex={2}>
          <Button variant="text" endIcon={<Pencil />} color="success">
            <Trans>Edit ticket</Trans>
          </Button>
        </CentricBox>
      </Stack>
      <Stack flexDirection="row" flex={2} py={2}>
        <Stack flex={1.25} alignItems="center">
          <Typography variant="h2">
            <Trans>{`Flight ${props.FlightDate}`}</Trans>
          </Typography>
        </Stack>
        <Stack flex={1} flexDirection="row" px={1}>
          <CentricBox flex={1} flexDirection="column">
            <CentricBox>
              <Typography variant="h2">{props.startTime}</Typography>
            </CentricBox>
            <CentricBox>
              <Typography variant="h3" color="grey.400]">
                {props.departureCity}
              </Typography>
            </CentricBox>
          </CentricBox>
          <Stack flex={1} justifyContent="start" alignItems="center">
            <Airplane width={36} height={36} />
          </Stack>
          <CentricBox flex={1} flexDirection="column">
            <CentricBox>
              <Typography variant="h2">{props.endTime}</Typography>
            </CentricBox>
            <CentricBox>
              <Typography variant="h3" color="grey.400">
                {props.arrivalCity}
              </Typography>
            </CentricBox>
          </CentricBox>
        </Stack>
      </Stack>
    </Wrapper>
  )
}
