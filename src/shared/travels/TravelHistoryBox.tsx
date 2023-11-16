import {Trans} from '@lingui/macro'
import {Grid, Stack, styled, Typography} from '@mui/material'
import {TravelStatusEnum, TravelTypeEnum} from '../types/server'
import {toMoneyCurrency} from '../utils/currency'

export type TravelHistoryBoxProps = {
  bookNumber: string
  buyingDate: string
  travelType: TravelTypeEnum
  status: TravelStatusEnum
  price: number
}

const Wrapper = styled(Stack)(({theme}) => ({
  borderRadius: theme.spacing(1),
  boxShadow: `0px 0px 4px rgba(51, 51, 51, 0.2);`,
  padding: theme.spacing(1.5, 1),
  margin: theme.spacing(1, 0),
}))

const StateTypography = styled(Typography)(({theme}) => ({
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.shades[3]}`,
  borderRadius: theme.spacing(4),
  margin: theme.spacing(1),
}))
export const TravelHistoryBox = (props: TravelHistoryBoxProps) => {
  return (
    <Wrapper>
      <Grid container>
        <Grid xs={7} item>
          <Stack py={1}>
            <Typography variant="caption" color="shades.9">
              <Trans>Book number: {props.bookNumber}</Trans>
            </Typography>
          </Stack>
          <Stack py={1}>
            <Typography variant="caption" color="shades.9">
              <Trans>Buying date: {props.buyingDate}</Trans>
            </Typography>
          </Stack>
          <Stack py={1}>
            <Typography variant="caption" color="shades.9">
              <Trans>Price: {toMoneyCurrency(props.price)} Rial</Trans>
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={5} item>
          <Stack py={1}>
            <Typography variant="caption" color="shades.9">
              <Trans>Travel type: {props.travelType}</Trans>
            </Typography>
          </Stack>
          <Stack py={2}>
            <Typography>
              <Typography variant="caption" color="shades.9">
                <Trans>Status: </Trans>
              </Typography>
              <StateTypography variant="caption" color="shades.9">
                {props.status}
              </StateTypography>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  )
}
