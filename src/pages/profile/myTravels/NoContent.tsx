import {Trans} from '@lingui/macro'
import {Stack, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {noTravel} from 'src/assets/img'
import {Button} from 'src/shared/button'

export const NoContent = () => {
  const navigate = useNavigate()
  return (
    <Stack mt={4}>
      <Stack py={1} px={10}>
        <img src={noTravel} alt="no travel content" />
      </Stack>
      <Stack py={1} px={7} alignItems="center">
        <Typography variant="caption">
          <Trans>There is no travel in your account.</Trans>
        </Typography>
        <Typography variant="caption">
          <Trans>First of all search to buy.</Trans>
        </Typography>
      </Stack>
      <Stack py={1} px={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate('/flight')
          }}
        >
          <Trans>Search</Trans>
        </Button>
      </Stack>
    </Stack>
  )
}
