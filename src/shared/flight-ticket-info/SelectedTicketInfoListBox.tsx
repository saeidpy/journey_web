import {Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'

type SelectedTicketInfoListBoxType = {
  departureCity: string
  destinationCity: string
  flightCompanyName: string
  flightDateAndTime: string
  flightNumber: string
  flightClass: string
  allowableLoad: string
  hasSpecialService: boolean
  isRefundable: boolean
}

type FlightInfoType = {
  isOneWay?: boolean
  departureTicket: SelectedTicketInfoListBoxType
  returnTicket?: SelectedTicketInfoListBoxType
}

const Wrapper = styled(Stack)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.shades[3]}`,
  padding: theme.spacing(0, 1),
}))
const Row = styled(Stack)(({theme}) => ({
  flexDirection: 'row',
  padding: theme.spacing(0.5, 0),
  justifyContent: 'space-between',
}))

const TicketInfoBox = (props: SelectedTicketInfoListBoxType) => {
  return (
    <>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Departure</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.departureCity}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Destination</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.destinationCity}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Flight company</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.flightCompanyName}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Flight date and time</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.flightDateAndTime}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Flight number</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.flightNumber}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Flight class</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.flightClass}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Allowable load</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.allowableLoad}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Special service</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.hasSpecialService ? <Trans>Has</Trans> : <Trans>Doesn't have</Trans>}
          </Typography>
        </Stack>
      </Row>
      <Row>
        <Stack py={1}>
          <Typography color="shades.9" variant="body1">
            <Trans>Refundable</Trans>:
          </Typography>
        </Stack>
        <Stack py={1}>
          <Typography color="shades.9" variant="h2">
            {props.isRefundable ? <Trans>Yes</Trans> : <Trans>No</Trans>}
          </Typography>
        </Stack>
      </Row>
    </>
  )
}
export const SelectedTicketInfoListBox = ({isOneWay, departureTicket, returnTicket}: FlightInfoType) => {
  return (
    <Wrapper>
      <Stack py={2}>
        <Typography color="shades.8" variant="h1">
          <Trans>Ticket information</Trans>
        </Typography>
      </Stack>
      {isOneWay === false ? (
        <Row>
          <Stack py={1}>
            <Typography color="shades.8" variant="h1">
              <Trans>Departure</Trans>
            </Typography>
          </Stack>
        </Row>
      ) : null}
      <TicketInfoBox {...departureTicket} />
      {isOneWay === false ? (
        <Row>
          <Stack py={2}>
            <Typography color="shades.8" variant="h1">
              <Trans>Return</Trans>
            </Typography>
          </Stack>
        </Row>
      ) : null}
      {isOneWay === false ? returnTicket && <TicketInfoBox {...returnTicket} /> : null}
    </Wrapper>
  )
}
