import {PlaceOutlined} from '@mui/icons-material'
import {Stack, styled, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {RateIcon} from 'src/shared/rate'
import {ResortResponseItem} from 'src/shared/types/server'
import {Image} from './Image'

const Wrapper = styled('div')(({theme}) => ({
  borderRadius: theme.spacing(0, 10),
  margin: theme.spacing(0, 1),
  cursor: 'pointer',
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
})

export const Cart = (prop: ResortResponseItem) => {
  const navigate = useNavigate()

  return (
    <Wrapper onClick={() => navigate({pathname: `/things/${prop.resort_id}`}, {state: {resort: prop}})}>
      <Image alt={prop.name_fa} src={prop.media_list[0]?.url} />
      <FlexBox>
        {prop.name_fa && (
          <TitleTypography color="shades.8" variant="h2">
            {prop.name_fa}
          </TitleTypography>
        )}
      </FlexBox>
      <FlexBox>
        <RateIcon rate={prop?.total_popularity_score || 0} />
      </FlexBox>
      {prop.location && (
        <FlexBox paddingTop={1}>
          <StyledPlaceOutlinedIcon />
          <Typography variant="subtitle1" color="shades.6">
            {prop.location.city?.city_name_fa}
          </Typography>
        </FlexBox>
      )}
    </Wrapper>
  )
}
