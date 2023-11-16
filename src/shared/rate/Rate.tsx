import {Trans} from '@lingui/macro'
import {Typography} from '@mui/material'
import {RateIcon} from './RateIcon'
import {RateStyledSpan} from './RateStyledSpan'
import {RateWrapper} from './RateWrapper'
export type RateProps = {
  count: number
  rate?: number | null
}

// const RateIcon = styled('img')({
//   margin: '0px 1px',
// })
export const Rate = (props: RateProps) => {
  // const halfNumber: boolean = props.rate % 1 > 0 ? true : false
  // const containedNumber: number = Math.floor(props.rate)
  // const outlinedNumber: number = halfNumber ? 5 - containedNumber - 1 : 5 - containedNumber

  return (
    <RateWrapper>
      <RateStyledSpan>
        <RateStyledSpan>
          <Typography variant="subtitle1" color="shades.9" alignItems="center">
            <Trans>{props.count} Comments</Trans>
          </Typography>
        </RateStyledSpan>
        <RateIcon rate={props.rate ?? 0} />
      </RateStyledSpan>
    </RateWrapper>
  )
}
