import {Grid, IconButton, styled} from '@mui/material'

export const HiddenInput = styled('input')({
  display: 'none',
})

export const CustomGrid = styled(Grid)({
  flex: '10 0 auto',
  position: 'relative',
})

export const IconButtonForRemovePreviewPhoto = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
})
