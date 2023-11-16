import {Trans} from '@lingui/macro'
import {Stack} from '@mui/material'
import {Spinner} from './Spinner'

// TODO: check styles here

export function FullScreenLoading() {
  return (
    <Stack
      sx={{
        height: '100vh',
        flexDirection: 'coulmn',
        marginRight: '50%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        margin: 'auto',
      }}
    >
      <p style={{marginTop: '80%'}}>
        <Trans>Loading...</Trans>
      </p>
      <Spinner />
    </Stack>
  )
}
