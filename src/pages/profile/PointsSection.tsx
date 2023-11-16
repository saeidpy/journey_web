import {t, Trans} from '@lingui/macro'
import {Grid, IconButton as MuiIconButton, Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {useNavigate, useParams} from 'react-router-dom'
import {About, Diamond, RedMedal} from 'src/assets/icons'
import {pointsTabQuery} from './pointsTab.query'

const Wrapper = styled(Stack)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.disabled}`,
  padding: theme.spacing(0, 2),
}))

const IconButton = styled(MuiIconButton)({
  padding: 0,
})

export interface PointsSectionProps {
  score: number
  isSelf?: boolean
  name?: string
}

export const PointsSection = ({score, isSelf, name}: PointsSectionProps) => {
  const {id = ''} = useParams<{id: string}>()
  const {data} = useQuery(['pointsSection', id], pointsTabQuery)
  const navigate = useNavigate()

  return (
    <Stack>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Diamond />
          </Grid>
          {score !== undefined ? (
            <Grid item xs={10}>
              <Typography color="shades.9" variant="h2">
                <Trans>
                  {isSelf ? t`Your` : name} points: {score}
                </Trans>
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={1}>
            <IconButton size="large" onClick={() => navigate('/profile/guide-point')}>
              <About />
            </IconButton>
          </Grid>
        </Grid>
      </Wrapper>
      <Wrapper>
        <Grid py={2} container spacing={2}>
          <Grid item xs={11}>
            <Typography variant="h2" color="shades.9">
              <Trans>Medals</Trans>
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="large" onClick={() => navigate('/profile/guide-medal')}>
              <About />
            </IconButton>
          </Grid>
        </Grid>
        {data &&
          data?.map((item, i) => (
            <Stack py={1} flexDirection={'row'} key={i}>
              <Stack>
                <RedMedal />
              </Stack>
              <Stack>
                <Typography variant="body1" color="shades.9">
                  {item.medal}
                </Typography>
              </Stack>
            </Stack>
          ))}
      </Wrapper>
      {/* <Wrapper>
        <Grid py={2} container spacing={2}>
          <Grid item xs={11}>
            <Typography variant="h6" color={'black'}>
              بلدها
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <About />
          </Grid>
        </Grid>
        <Stack py={1} flexDirection={'row'}>
          <Stack>
            <RedMedal />
          </Stack>
          <Stack>
            <Typography>{'بلد تهران'}</Typography>
          </Stack>
        </Stack>
        <Stack py={1} flexDirection={'row'}>
          <Stack>
            <GreenMedal />
          </Stack>
          <Stack>
            <Typography>{'بلد تهران'}</Typography>
          </Stack>
        </Stack>
      </Wrapper>
      <Wrapper>
        <Typography py={2} variant="h6" color={'black'}>
          <Trans>Labels</Trans>
        </Typography>
        <Grid py={1} container spacing={2}>
          <Grid item xs={6}>
            <Label text="کوهنورد" labelTheme="active"></Label>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <Trans>comment's count: {20}</Trans>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">
              <Trans>points: {20}</Trans>
            </Typography>
          </Grid>
        </Grid>
        <Grid py={1} container spacing={2}>
          <Grid item xs={6}>
            <Label text="طببیعت دوست" labelTheme="active"></Label>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <Trans>comment's count: {20}</Trans>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">
              <Trans>points: {20}</Trans>
            </Typography>
          </Grid>
        </Grid>
        <Grid py={1} container spacing={2}>
          <Grid item xs={6}>
            <Label text="کوهنورد" labelTheme="active"></Label>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              <Trans>comment's count: {20}</Trans>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">
              <Trans>points: {20}</Trans>
            </Typography>
          </Grid>
        </Grid>
      </Wrapper> */}
    </Stack>
  )
}
