import {t} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {Header} from 'src/shared/layouts/app-layout'
import {information} from './mockData'

const Wrapper = styled(Stack)(({theme}) => ({
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.grey[400]}`,
}))
export default function TermsPage() {
  return (
    <>
      <Header title={t`Rules and regulations`} hasBackButton fullWidth />
      <Wrapper sx={{border: 'none', textAlign: 'justify'}}>
        <Typography variant="body1">{information.intro}</Typography>
      </Wrapper>
      <Typography variant="h2">{information.conditionsTitle[0]}</Typography>
      <Wrapper sx={{textAlign: 'justify'}}>
        <Stack>
          <Stack flexDirection="row">
            <Stack flex={1}>
              <Typography>1. </Typography>
            </Stack>
            <Stack flex={12}>
              <Typography>{information.commentConditions[0]}</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row">
            <Stack flex={1}>
              <Typography>2. </Typography>
            </Stack>
            <Stack flex={12}>
              <Typography>{information.commentConditions[1]}</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row">
            <Stack flex={1}>
              <Typography>3. </Typography>
            </Stack>
            <Stack flex={12}>
              <Typography>{information.commentConditions[2]}</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row">
            <Stack flex={1}>
              <Typography>4. </Typography>
            </Stack>
            <Stack flex={12}>
              <Typography>{information.commentConditions[3]}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Wrapper>

      <Wrapper sx={{border: 'none', textAlign: 'justify'}}>
        <Typography variant="h2">{information.conditionsTitle[1]}</Typography>
      </Wrapper>
      <Wrapper sx={{border: 'none', textAlign: 'justify'}}>
        <Stack>
          <Stack flexDirection="row">
            <Stack flex={1}>
              <Typography>1. </Typography>
            </Stack>
            <Stack flex={12}>
              <Typography>{information.uploadConditions[0]}</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row">
            <Stack flex={1}>
              <Typography>2. </Typography>
            </Stack>
            <Stack flex={12}>
              <Typography>{information.uploadConditions[1]}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Wrapper>
    </>
  )
}
