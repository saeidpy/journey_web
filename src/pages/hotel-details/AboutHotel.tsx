import {Trans} from '@lingui/macro'
import {Stack, styled, Typography, useTheme} from '@mui/material'
import {PlaceExplanation} from '../things/ThingsPageStuff'

const PlaceExplanationWrapper = styled(Stack)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1, 0, 2, 0),
}))

type AboutType = {
  description?: string
  navigate: () => void
}
export const AboutHotel = ({description, navigate}: AboutType) => {
  const theme = useTheme()
  return (
    <>
      <Stack borderTop={`1px solid ${theme.palette.shades[3]}`}>
        <Stack py={1}>
          <Typography variant="h3">
            <Trans>About hotel</Trans>
          </Typography>
        </Stack>
        <Stack pt={2}>
          {description && (
            <PlaceExplanationWrapper>
              <PlaceExplanation navigate={navigate} text={description} />
            </PlaceExplanationWrapper>
          )}
        </Stack>
      </Stack>
    </>
  )
}
