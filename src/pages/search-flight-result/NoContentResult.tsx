import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {noContent} from 'src/assets/img'

const CentricWrapper = styled(Stack)(({theme}) => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2, 0),
  textAlign: 'center',
}))
export const NoContentResult = () => {
  return (
    <CentricWrapper px={1} mt={20}>
      <CentricWrapper>
        <CentricWrapper>
          <img alt={t`No result content.`} src={noContent} width="100%" />
        </CentricWrapper>
        <CentricWrapper>
          <Typography variant="h2">
            <Trans>Unfortunately, there are no flights for your desired route on this date.</Trans>
          </Typography>
        </CentricWrapper>
        <CentricWrapper>
          <Typography variant="h3">
            <Trans>Please choose another date.</Trans>
          </Typography>
        </CentricWrapper>
      </CentricWrapper>
    </CentricWrapper>
  )
}
