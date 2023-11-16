import {useQuery} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {Cart} from 'src/shared/cart'
import {HorizontalScrollableBox} from 'src/shared/horizontal-scrollable'
import {ResortTypeEnum} from 'src/shared/types/server'
import {cityRestaurantsQuery} from './cityRestaurants.query'

export interface CityRestaurantsProps {
  cityId: string
}

export function CityRestaurants({cityId}: CityRestaurantsProps) {
  const {data, isSuccess} = useQuery(['CityRestaurants', cityId], cityRestaurantsQuery)
  const navigate = useNavigate()

  if (isSuccess) {
    return (
      <>
        {data?.length ? (
          <HorizontalScrollableBox
            showAll={() => {
              navigate(
                {pathname: 'attractions'},
                {state: {cityId: cityId, resortType: ResortTypeEnum.RESTAURANT, city_name_fa: data[0].location.city.city_name_fa}}
              )
            }}
            title="رستوران"
            items={data ?? []}
            Component={Cart}
          />
        ) : null}
      </>
    )
  } else return null
}
