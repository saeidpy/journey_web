import {Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'

type FlightFurtherInformationType = {
  PlaneModel: string
  flightClass: string
  ticketType: string
  flightNumber: string
  allowableLoad: string | null | undefined
}

const Link = styled('a')({
  textDecoration: 'underline',
  color: '#1A0DAB',
})
export const FlightFurtherInformation = (props: FlightFurtherInformationType) => {
  return (
    <Stack>
      <Stack py={2}>
        <Typography variant="h2" color="shades.9">
          <Trans>Further information</Trans>
        </Typography>
      </Stack>
      <Stack py={2} flexDirection={'row'}>
        <Stack>
          <Typography color="shades.9" variant="body1">
            <Trans>Airplane model </Trans>
          </Typography>
        </Stack>
        <Stack>
          <Typography px={1} color="shades.6" variant="subtitle1">
            {props.PlaneModel}
          </Typography>
        </Stack>
      </Stack>
      <Stack py={2} flexDirection="row">
        <Stack>
          <Typography color="shades.9" variant="body1">
            <Trans>Flight class </Trans>
          </Typography>
        </Stack>
        <Stack>
          <Typography px={1} color="shades.6" variant="subtitle1">
            {props.flightClass}
          </Typography>
        </Stack>
      </Stack>
      <Stack py={2} flexDirection="row">
        <Stack>
          <Typography color="shades.9" variant="body1">
            <Trans>Ticket type </Trans>
          </Typography>
        </Stack>
        <Stack>
          <Typography px={1} color="shades.6" variant="subtitle1">
            {props.ticketType}
          </Typography>
        </Stack>
      </Stack>
      <Stack py={2} flexDirection="row">
        <Stack>
          <Typography color="shades.9" variant="body1">
            <Trans>Flight number </Trans>
          </Typography>
        </Stack>
        <Stack>
          <Typography px={1} color="shades.6" variant="subtitle1">
            {props.flightNumber}
          </Typography>
        </Stack>
      </Stack>
      {props.allowableLoad ? (
        <Stack py={2} flexDirection="row">
          <Stack>
            <Typography color="shades.9" variant="body1">
              <Trans>Allowable load </Trans>
            </Typography>
          </Stack>
          <Stack>
            <Typography px={1} color="shades.6" variant="subtitle1">
              {props.allowableLoad}
            </Typography>
          </Stack>
        </Stack>
      ) : null}
      <Stack py={2}>
        <Link href="#">
          <Typography variant="body1">
            <Trans>Refund rules</Trans>
          </Typography>
        </Link>
      </Stack>
    </Stack>
  )
}
