import {useQuery} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {Cart} from 'src/shared/cart'
import {HorizontalScrollableBox} from 'src/shared/horizontal-scrollable'
import {ResortTypeEnum} from 'src/shared/types/server'
import {cityResidencesQuery} from './cityResidences.query'

export interface CityResidencesProps {
  cityId: string
}

export function CityResidences({cityId}: CityResidencesProps) {
  const {data, isSuccess} = useQuery(['CityResidences', cityId], cityResidencesQuery)
  const navigate = useNavigate()

  if (isSuccess) {
    return (
      <>
        {data?.length ? (
          <HorizontalScrollableBox
            showAll={() => {
              navigate(
                {pathname: 'attractions'},
                {state: {cityId: cityId, resortType: ResortTypeEnum.RESIDENCE, city_name_fa: data[0].location.city.city_name_fa}}
              )
            }}
            title="اقامت"
            items={data ?? []}
            Component={Cart}
          />
        ) : null}
      </>
    )
  } else return null
}
