import {t, Trans} from '@lingui/macro'
import {Grid, Stack, styled, Typography} from '@mui/material'
import {Header} from 'src/shared/layouts/app-layout'
import {pointCollecting1, pointCollecting2, pointCollecting3, points, pointsReason} from './text'

const Wrapper = styled(Stack)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  width: '100%',
  padding: theme.spacing(3, 1),
}))

export default function PointGuidePage() {
  return (
    <>
      <Header hasBackButton={true} title={t`Point's guide`} fullWidth />
      <Typography py={1} variant="h6">
        <Trans>What is point?</Trans>
      </Typography>
      <Typography sx={{whiteSpace: 'pre-line'}} variant="body2">
        {points}
      </Typography>
      <Typography py={1} variant="h6">
        <Trans>Why do we need points?</Trans>
      </Typography>
      <Typography sx={{whiteSpace: 'pre-line'}} variant="body2">
        {pointsReason}
      </Typography>
      <Typography py={1} variant="h6">
        <Trans>How to collect points?</Trans>
      </Typography>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography>{pointCollecting1}</Typography>
          </Grid>
          <Grid item xs={3} display={'flex'} justifyContent={'flex-end'}>
            <Typography>
              <Trans>{10} Points</Trans>
            </Typography>
          </Grid>
        </Grid>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography>{pointCollecting2}</Typography>
          </Grid>
          <Grid item xs={3} display={'flex'} justifyContent={'flex-end'}>
            <Typography>
              <Trans>{2} Points</Trans>
            </Typography>
          </Grid>
        </Grid>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography>{pointCollecting3}</Typography>
          </Grid>
          <Grid item xs={3} textAlign={'end'}>
            <Typography>
              <Trans>x2 Taken points</Trans>
            </Typography>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  )
}
