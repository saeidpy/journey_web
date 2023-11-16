import {Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {flightLogo} from 'src/assets/img'
import {Tag} from 'src/shared/label'
import {Wrapper} from './FlightFormWrapper'

export type FlightTicketInfoBoxType = {
  tags: string[]
  flightName: string
  flightLogoUrl: string
  departureCity: string
  arrivalCity: string
  vacancyCount: number
  startTime: string
  endTime: string
  price: number
  FlightDate?: Date
  isReturn?: boolean
  onClick: () => void
}

const Footer = styled(Stack)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.grey[300]}`,
  alignItems: 'center',
  flexDirection: 'row',
  flex: 1,
  padding: theme.spacing(2, 0),
}))

const DashedLine = styled(Stack)(({theme}) => ({
  borderBottom: `3px dashed ${theme.palette.main.primary0}`,
  flex: 1,
}))

export const FlightTicketInfoBox = (props: FlightTicketInfoBoxType) => {
  return (
    <Wrapper onClick={props.onClick} noTopPadding={props.isReturn}>
      <Stack flex={1} flexDirection={'row'} justifyContent={'center'}>
        <Stack flex={1} p={1}>
          <img width="90%" src={flightLogo} alt={props.flightName} />
        </Stack>
        <Stack flex={2} justifyContent={'center'}>
          <Typography variant="h2">{props.flightName}</Typography>
        </Stack>
        <Stack flex={4} direction={'row'} flexWrap={'nowrap'} justifyContent="flex-start" alignItems="center">
          {props.tags.map((tag, index) => (
            <Tag variant="subtitle1" key={index}>
              {tag}
            </Tag>
          ))}
        </Stack>
      </Stack>
      <Stack flex={2} flexDirection="row" p={[2, 1]}>
        <Stack flex={1} justifyContent="center" alignItems="center">
          <Typography variant="h1">{props.startTime}</Typography>
          <Typography variant="h3">{props.departureCity}</Typography>
        </Stack>
        <Stack flexDirection="row" px={2} flex={4} justifyContent="center" alignItems="center">
          <DashedLine />
        </Stack>
        <Stack flex={1} justifyContent="center" alignItems="center">
          <Typography variant="h1">{props.endTime}</Typography>
          <Typography variant="h3">{props.arrivalCity}</Typography>
        </Stack>
      </Stack>
      {props.isReturn !== false ? (
        <Footer>
          <Stack paddingLeft={1} flexDirection="row" flex={2}>
            <Stack>
              <Typography paddingX={1} variant="h1">
                {props.price.toLocaleString('fa-IR', {useGrouping: true})}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h3">
                <Trans>Tomans</Trans>
              </Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row" flex={1}>
            <Stack>
              <Typography paddingX={1} variant="h2" color="error.main">
                {props.vacancyCount}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h2" color="error.main">
                <Trans>Seat</Trans>
              </Typography>
            </Stack>
          </Stack>
        </Footer>
      ) : null}
    </Wrapper>
  )
}
