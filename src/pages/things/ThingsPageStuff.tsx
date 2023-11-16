import {Trans} from '@lingui/macro'
import {Grid, Stack, styled, Typography} from '@mui/material'
import {LeftArrow} from 'src/assets/icons'
import {Button} from 'src/shared/button'

type ExplanationProp = {
  text: string
  navigate: () => void
}

const EllipsisTypography = styled(Typography)({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
})

const LeftArrowIcon = styled(LeftArrow)(({theme}) => ({
  '& path': {
    stroke: theme.palette.main['primary4'],
  },
}))

const StyleButton = styled(Button)(({theme}) => ({
  color: theme.palette.main['primary4'],
}))

export const PlaceExplanation = (props: ExplanationProp) => {
  return (
    <Stack py={1}>
      <Grid container>
        <Grid item xs={9}>
          <EllipsisTypography variant="body1">{props.text}</EllipsisTypography>
        </Grid>
        <Grid item display="flex" justifyContent="flex-end" xs={3}>
          <StyleButton variant="text" endIcon={<LeftArrowIcon />} onClick={props.navigate}>
            <Typography variant="body1" color="main.primary4">
              <Trans>More</Trans>
            </Typography>
          </StyleButton>
        </Grid>
      </Grid>
    </Stack>
  )
}
