import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'

type TicketSelectionCaptionSectionType = {
  isِDeparture: boolean
}

const Wrapper = styled(Stack)(({theme}) => ({
  padding: theme.spacing(2, 1),
  borderBottom: `1px solid ${theme.palette.shades[3]}`,
}))
export const TicketSelectionCaptionSection = (props: TicketSelectionCaptionSectionType) => {
  return (
    <Wrapper>
      <Typography variant="h1" color="shades.9">
        {props.isِDeparture ? t`Departure ticket` : t`Return ticket`}
      </Typography>
      <Typography variant="body1" color="shades.9">
        <Trans>Choose your {props.isِDeparture ? 'Departure ticket' : 'Return ticket'}</Trans>
      </Typography>
    </Wrapper>
  )
}
