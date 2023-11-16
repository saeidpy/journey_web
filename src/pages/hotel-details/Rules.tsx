import {Trans} from '@lingui/macro'
import {Stack, Typography, useTheme} from '@mui/material'

type RulesType = {
  entranceTime: string
  exitTime: string
}
export const Rules = (props: RulesType) => {
  const theme = useTheme()
  return (
    <>
      <Stack mt={1} py={2} borderTop={`1px solid ${theme.palette.shades[3]}`}>
        <Stack py={1}>
          <Typography variant="h3">
            <Trans>Rules and regulations</Trans>
          </Typography>
        </Stack>
        <Stack py={1} flexDirection="row">
          <Stack>
            <Typography>
              <Trans>Entrance time: {props.entranceTime}</Trans>
            </Typography>
          </Stack>
          <Stack px={1.5}>|</Stack>
          <Stack>
            <Typography>
              <Trans>Exit time: {props.exitTime}</Trans>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
