import {entityFromCity} from 'src/shared/entity/entityFromCity'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {ResortTypeEnum} from 'src/shared/types/server'
import {cityAttractionsQuery} from './cityAttractions.query'

type AttractionProps = {
  cityId: number
  resortType: ResortTypeEnum
}

export const AttractionsSection = (props: AttractionProps) => {
  return (
    <>
      <ScrollBasedInfiniteQuery
        queryKey={[
          'cityAttractions',
          props.cityId.toString(),
          props.resortType === ResortTypeEnum.TOURISM_ENTITY ? 'tourismEntity' : props.resortType,
        ]}
        queryFn={cityAttractionsQuery}
        selectData={entityFromCity}
      />
    </>
  )
}
