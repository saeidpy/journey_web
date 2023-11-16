import {Stack, Typography} from '@mui/material'
import {ReactNode} from 'react'
import {flightLogo} from 'src/assets/img'

type FlightNameAndLogoType = {
  flightName: string
  flightLogo: string
  children?: ReactNode
}
export const FlightNameAndLogo = (props: FlightNameAndLogoType) => {
  return (
    <Stack flexDirection="row" flex={1}>
      <Stack flex={1} p={1}>
        <img width="90%" src={flightLogo} alt={props.flightName} />
      </Stack>
      <Stack flex={2} justifyContent={'center'}>
        <Typography color="Shades.9">{props.flightName}</Typography>
      </Stack>
      <Stack flex={3}>{props.children ? props.children : null}</Stack>
    </Stack>
  )
}
