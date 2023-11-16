import {t} from '@lingui/macro'
import {useQuery} from '@tanstack/react-query'
import {useNavigate, useParams} from 'react-router-dom'
import {Cart} from 'src/shared/cart'
import {HorizontalScrollableBox} from 'src/shared/horizontal-scrollable'
import {resortRelatedQuery} from './resortRelated.query'

export function ThingsRelatedLocation() {
  const {id = ''} = useParams<{id: string}>()
  const {data, isSuccess} = useQuery(['ThingsRelated', id], resortRelatedQuery)
  const navigate = useNavigate()
  if (isSuccess && data?.data) {
    return (
      <>
        {data?.data?.result ? (
          <HorizontalScrollableBox
            showAll={() => {
              navigate(
                {pathname: `/things/${id}/related-location`},
                {state: {resortId: id, city_name_fa: data?.data?.result[0].location.city.city_name_fa}}
              )
            }}
            title={t`Related location`}
            items={data?.data?.result ?? []}
            Component={Cart}
          />
        ) : null}
      </>
    )
  } else return null
}
