import {Trans} from '@lingui/macro'
import {PlaceOutlined} from '@mui/icons-material'
import {Stack, styled, Typography} from '@mui/material'
import {useNavigate} from 'react-router'
import {Dot, StarIcon} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {Image} from 'src/shared/cart'

const Wrapper = styled(Button)(({theme}) => ({
  borderRadius: theme.spacing(2),
  margin: theme.spacing(0, 1),
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 0px 4px 0px ' + theme.palette.divider,
}))

const FlexBox = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
})

const StyledPlaceOutlinedIcon = styled(PlaceOutlined)(({theme}) => ({
  color: theme.palette.shades['6'],
  fontSize: 16,
  marginRight: theme.spacing(0.5),
}))

const TitleTypography = styled(Typography)({
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'start',
})

type HotelCartPropsType = {
  name_fa: string
  imageUrl: string
  star: number
  rate: number
  voteCount: number
  minPrice: number
  country: string
  cityName: string
  id: string
  onClick?: (id: string) => void
}
export const HotelCart = (prop: HotelCartPropsType) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/hotel/hotel-details/' + prop.id, {state: {resort: false}})
  }

  return (
    <Wrapper onClick={onClick}>
      <Stack width={'100%'}>
        <Image sx={{height: 200}} alt={prop.name_fa} src={prop.imageUrl} />
      </Stack>
      <Stack py={1} px={2} width="100%" gap={1}>
        <FlexBox>
          {prop.name_fa && (
            <TitleTypography color="shades.8" variant="h2">
              {prop.name_fa}
            </TitleTypography>
          )}
        </FlexBox>
        <FlexBox>
          <StarIcon width={10} height={10} />
          <Typography px={0.5} variant="subtitle1" color="shades.6">
            <Trans>{prop.star} stars</Trans>
          </Typography>
          <Dot width={9.5} height={9.5} />
          <Typography px={0.5} variant="h3" color="main.primary3">
            {prop.rate}
          </Typography>
          <Typography px={0.5} variant="subtitle1" color="main.primary3">
            <Trans>({prop.voteCount} comments)</Trans>
          </Typography>
        </FlexBox>

        <FlexBox paddingTop={1}>
          <StyledPlaceOutlinedIcon />
          <Typography variant="subtitle1" color="shades.6">
            {`${prop.country} - ${prop.cityName}`}
          </Typography>
        </FlexBox>

        <FlexBox>
          <Typography px={0.5} variant="subtitle1" color="shades.9">
            <Trans>Starting price / Each night: </Trans>
          </Typography>
          <Typography px={0.5} variant="h3" color="main.primary3">
            {prop.minPrice?.toLocaleString('fa-IR', {useGrouping: true})}
          </Typography>
          <Typography px={0.5} variant="h3" color="main.primary3">
            <Trans>Tomans</Trans>
          </Typography>
        </FlexBox>
      </Stack>
    </Wrapper>
  )
}
