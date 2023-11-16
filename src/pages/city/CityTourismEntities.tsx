import {useQuery} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {Cart} from 'src/shared/cart'
import {HorizontalScrollableBox} from 'src/shared/horizontal-scrollable'
import {ResortTypeEnum} from 'src/shared/types/server'
import {cityTourismEntitiesQuery} from './cityTourismEntities.query'

export interface CityTourismEntitiesProps {
  cityId: string
}

export function CityTourismEntities({cityId}: CityTourismEntitiesProps) {
  const {data, isSuccess} = useQuery(['CityTourismEntities', cityId], cityTourismEntitiesQuery)
  const navigate = useNavigate()

  if (isSuccess) {
    return (
      <>
        {data?.length ? (
          <HorizontalScrollableBox
            showAll={() => {
              navigate(
                {pathname: 'attractions'},
                {state: {cityId: cityId, resortType: ResortTypeEnum.TOURISM_ENTITY, city_name_fa: data[0].location.city.city_name_fa}}
              )
            }}
            title="جاذبه ها"
            items={data ?? []}
            Component={Cart}
          />
        ) : null}
      </>
    )
  } else return null
}
