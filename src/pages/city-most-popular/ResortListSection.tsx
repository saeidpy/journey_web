import {entityFromCity} from 'src/shared/entity/entityFromCity'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {ResortTypeEnum} from 'src/shared/types/server'
import {mostPopularQuery} from './mostPopular.query'

type ResortListSectionProps = {
  cityId: number
  resortType: ResortTypeEnum
}

export const ResortListSection = (props: ResortListSectionProps) => {
  return (
    <>
      <ScrollBasedInfiniteQuery
        queryKey={[
          'ThingsComments',
          props.cityId.toString(),
          props.resortType === ResortTypeEnum.TOURISM_ENTITY ? 'tourismEntity' : props.resortType,
        ]}
        queryFn={mostPopularQuery}
        selectData={entityFromCity}
      />
    </>
  )
}
