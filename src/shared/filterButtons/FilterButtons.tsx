import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {ReactElement} from 'react'
import {useNavigate} from 'react-router-dom'
import {Airplane2, AttractionsIcon, StayIcon} from 'src/assets/icons'
import {OutlinedButton} from 'src/shared/outlined-button'
import {ResortTypeEnum, StationType} from 'src/shared/types/server'

type filterButtonTypes = {name: string; icon: ReactElement; type: ResortTypeEnum | StationType}

export const FilterButtons = () => {
  const navigate = useNavigate()

  const goToSearchPage = (type: string) => {
    navigate({
      pathname: '/search',
      search: `?type=${type}`,
    })
  }

  const goToFlightPage = () => {
    navigate('/flight')
  }

  const goToHotelPage = () => {
    navigate('/hotel')
  }

  const filters: filterButtonTypes[] = [
    {name: t`Attractions`, icon: <AttractionsIcon />, type: ResortTypeEnum.TOURISM_ENTITY},
    {name: t`Flight`, icon: <Airplane2 />, type: StationType.AIRPORT},
    {name: t`Hotel`, icon: <StayIcon />, type: StationType.HOTEL},
    // {name: t`Restaurant`, icon: <RestaurantIcon />, type: ResortTypeEnum.RESTAURANT},
  ]
  const onClick = (type: string) => {
    if (type === StationType.AIRPORT) {
      goToFlightPage()
    } else if (type === StationType.HOTEL) {
      goToHotelPage()
    } else if (type === ResortTypeEnum.TOURISM_ENTITY) {
      goToSearchPage(type)
    }
  }
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" direction="row">
      {filters.map((filter, index: number) => (
        <OutlinedButton
          size={'medium'}
          key={`FilterButtons_${index}`}
          variant="outlined"
          startIcon={filter.icon}
          fullWidth
          onClick={() => onClick(filter.type)}
        >
          {filter.name}
        </OutlinedButton>
      ))}
    </Stack>
  )
}
