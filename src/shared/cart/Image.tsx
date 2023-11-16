import {Stack, styled, SxProps, Theme} from '@mui/material'
import {noImagePng} from 'src/assets/img'
import {mobileUI} from 'src/shared/constants'

const StyledImage = styled('img')({
  borderRadius: 10,
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

const ImageWrapper = styled(Stack)({
  display: 'flex',
  height: mobileUI.cart.cartHeight,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
})

export const Image = ({src, alt, sx}: {src?: string; alt?: string; sx?: SxProps<Theme>}) => (
  <ImageWrapper sx={sx}>
    <StyledImage src={src || noImagePng} alt={alt} />
  </ImageWrapper>
)
