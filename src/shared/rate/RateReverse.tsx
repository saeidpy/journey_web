import {Trans} from '@lingui/macro'
import {Typography} from '@mui/material'
import {RateProps} from './Rate'
import {RateIcon} from './RateIcon'
import {RateStyledSpan} from './RateStyledSpan'
import {RateWrapper} from './RateWrapper'

export const RateReverse = (props: RateProps) => {
  return (
    <RateWrapper>
      <RateStyledSpan>
        <RateIcon rate={props.rate ?? 0} />
        <RateStyledSpan>
          <Typography variant="subtitle1" color="shades.9" alignItems="center">
            <Trans>{props.count} Comments</Trans>
          </Typography>
        </RateStyledSpan>
      </RateStyledSpan>
    </RateWrapper>
  )
}
