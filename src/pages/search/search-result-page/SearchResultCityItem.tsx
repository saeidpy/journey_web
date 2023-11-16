import {Grid, useTheme} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {PlaceBriefCart} from 'src/shared/cart'
import {LocationCityResponse} from 'src/shared/types/server'

export const CityItem = (props: {entity: LocationCityResponse}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Grid
      item
      pb={2}
      sx={{borderBottom: `1px solid ${theme.palette.grey[200]}`}}
      xs={12}
      onClick={() => {
        navigate({pathname: `/city/${props.entity.city_id}`})
      }}
    >
      <PlaceBriefCart
        name={props.entity.city_name_fa}
        imageUrl={props.entity.media_list.length > 0 ? props.entity.media_list[0].url : undefined}
        location={`ایران - ${props.entity.city_name_fa}`}
        withLocationIcon
      />
    </Grid>
  )
}
