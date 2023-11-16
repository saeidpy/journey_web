import {useQuery} from '@tanstack/react-query'
import {mostPopularQuery} from 'src/pages/city-most-popular/mostPopular.query'
import {HorizontalScrollableBox} from 'src/shared/horizontal-scrollable'
import {ResortResponseItem, ResortTypeEnum} from 'src/shared/types/server'

type MostPopularSectionProps = {
  title: string
  showAll?: () => void
  Component: React.FunctionComponent<ResortResponseItem>
  resortType: ResortTypeEnum
  cityId: string
}
export function MostPopularSection({title, showAll, Component, resortType, cityId}: MostPopularSectionProps) {
  const {data, isSuccess} = useQuery(
    ['MostPopular', cityId, resortType === ResortTypeEnum.TOURISM_ENTITY ? 'tourismEntity' : resortType],
    mostPopularQuery
  )
  return isSuccess ? (
    <HorizontalScrollableBox showAll={showAll} title={title} items={data?.result as ResortResponseItem[]} Component={Component} />
  ) : null
}
