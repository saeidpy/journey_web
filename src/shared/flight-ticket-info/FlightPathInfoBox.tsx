import {Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {FlightNameAndLogo} from './FlightNameAndLogo'

type FlightPathInfoBoxType = {
  departure: string
  destination: string
  flightDuration: number
  startTime: string
  endTime: string
  flightName: string
  flightLogoUrl: string
  flightDepartureDate: string
  flightArrivalDate: string
}

const InfoWrapper = styled(Stack)(({theme}) => ({
  borderLeft: `${theme.spacing(0.5)} dashed ${theme.palette.main.primary0}`,
  margin: theme.spacing(4),
  flexDirection: 'column',
  padding: theme.spacing(0, 2),
}))
export const FlightPathInfoBox = (props: FlightPathInfoBoxType) => {
  return (
    <Stack>
      <Stack>
        <FlightNameAndLogo flightLogo={props.flightLogoUrl} flightName={props.flightName} />
      </Stack>
      <Stack>
        <InfoWrapper>
          <Stack flex={1} flexDirection="row">
            <Stack flex={1}>
              <Typography color="shades.9" variant="h2">
                {props.startTime}
              </Typography>
            </Stack>
            <Stack flex={4}>
              <Typography color="shades.9" variant="body1">
                {props.departure}
              </Typography>
              <Typography color="shades.9" variant="body1">
                {props.flightDepartureDate}
              </Typography>
            </Stack>
          </Stack>
          <Stack flex={1} py={5}>
            <Typography color="shades.6" variant="body1">
              <Trans>{`Flight duration: ${props.flightDuration} minutes`}</Trans>
            </Typography>
          </Stack>
          <Stack flex={1} flexDirection="row">
            <Stack flex={1}>
              <Typography color="shades.9" variant="h2">
                {props.endTime}
              </Typography>
            </Stack>
            <Stack flex={4}>
              <Typography color="shades.9" variant="body1">
                {props.destination}
              </Typography>
              <Typography color="shades.9" variant="body1">
                {props.flightArrivalDate}
              </Typography>
            </Stack>
          </Stack>
        </InfoWrapper>
      </Stack>
    </Stack>
  )
}
