import {Trans} from '@lingui/macro'
import {ArrowBackIosNewTwoTone} from '@mui/icons-material'
import {Stack, styled, Typography} from '@mui/material'
import {Button} from 'src/shared/button'

export type HeaderAndShowAllProp = {
  title: string
  showAll?: () => void
}

const ShowAllButton = styled(Button)(({theme}) => ({
  color: theme.palette.shades['6.5'],
  fontSize: '16px',
}))

export const HeaderAndShowAll = (props: HeaderAndShowAllProp) => {
  return (
    <Stack flexWrap="wrap" direction="row" justifyContent="space-between" alignItems="center" py={1}>
      <Typography color="shades.8" variant="h1">
        {props.title}
      </Typography>
      {props.showAll && (
        <ShowAllButton endIcon={<ArrowBackIosNewTwoTone />} onClick={props.showAll} variant="text">
          <Trans>Show all</Trans>
        </ShowAllButton>
      )}
    </Stack>
  )
}
