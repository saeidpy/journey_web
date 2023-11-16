import {PlaceOutlined} from '@mui/icons-material'
import {Stack, styled, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {RoundedSlideContainer, SlideContainerProps} from 'src/shared/slider-container'
import {Rate} from '../rate'
import {GeoPointResponse, ResortTypeEnum} from '../types/server'
import {HotelResortType} from '../types/server/hotel/HotelResponseType'

type InputProps<T> = {
  placeName: string
  rate: number | null
  location?: string
  customlocation?: {name: string; geo_point: GeoPointResponse}
  voteCount: number
  id: number
  resort?: T
}

type EntityProps<T> = {
  entityProps: InputProps<T>
  sliderContainerProps: SlideContainerProps
}

const StylePlaceOutlinedIcon = styled(PlaceOutlined)(({theme}) => ({
  color: theme.palette.shades['6'],
  fontSize: 16,
  marginRight: theme.spacing(0.5),
}))

export function Entity<T = never>({entityProps, sliderContainerProps}: EntityProps<T>) {
  const navigate = useNavigate()

  const onClick = () => {
    if (entityProps && (entityProps?.resort as any)?.resort_type?.[0] === ResortTypeEnum.RESIDENCE) {
      //todo After the api comes, it will be fixed
      // navigate(`/hotel/hotel-details/${entityProps.id}`, {state: {type: HotelResortType.entity}})
      navigate(`/things/${entityProps.id}`, {state: {type: HotelResortType.entity}})
    } else {
      navigate({pathname: `/things/${entityProps.id}`}, {state: {resort: entityProps.resort}})
    }
  }

  return (
    <Stack width="100%" pb={4} position="relative" onClick={onClick}>
      <RoundedSlideContainer {...sliderContainerProps} />
      <Typography variant="h2" pt={1} m={0} color="shades.8">
        {entityProps.placeName}
      </Typography>
      <Stack justifyContent="space-between" alignItems="stretch" direction="row">
        <Stack flexGrow={1} alignItems="center" direction="row">
          <StylePlaceOutlinedIcon />
          <Typography variant="subtitle1" color="shades.6">
            {entityProps.location || entityProps?.customlocation?.name}
          </Typography>
        </Stack>
        <Stack flexGrow={1} justifyContent="flex-end" alignItems="center" direction="row">
          {entityProps.rate !== null && <Rate count={entityProps.voteCount} rate={entityProps.rate} />}
        </Stack>
      </Stack>
    </Stack>
  )
}
