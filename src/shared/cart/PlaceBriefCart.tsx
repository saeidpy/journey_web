import {Grid, Stack, styled, Typography} from '@mui/material'
import {Location} from 'src/assets/icons'
import {noImagePng} from 'src/assets/img'
import {mobileUI} from '../constants'

export type PlaceProps = {
  name?: string
  imageUrl?: string
  location?: string
  withLocationIcon?: boolean
}

const CustomTitle = styled(Typography)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

const CustomImage = styled('img')(({theme}) => ({
  width: mobileUI.cart.briefCartHeight,
  height: mobileUI.cart.briefCartHeight,
  borderRadius: 10,
  boxShadow: `${theme.spacing(0, 0, 0.625, 0.25)} ${theme.palette.shades[8]}1a`,
}))

const CustomGrid = styled(Grid)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

export const PlaceBriefCart = ({name, imageUrl, location, withLocationIcon}: PlaceProps) => {
  return (
    <Stack py={2}>
      <CustomGrid>
        <CustomImage src={imageUrl || noImagePng} />
        <Stack direction={'column'} sx={{height: '100%'}} justifyContent={'center'} alignItems={'flex-start'} paddingTop={1}>
          {name ? (
            <CustomTitle variant="h1" color="shades.8">
              {withLocationIcon ? <Location /> : null}
              {name}
            </CustomTitle>
          ) : null}
          {location ? (
            <Typography variant="body1" color="shades.8">
              {location}
            </Typography>
          ) : null}
        </Stack>
      </CustomGrid>
    </Stack>
  )
}
