import {LocationCityResponse, ResortResponseItem, SearchEntityTypeEnum, SearchResponseType} from 'src/shared/types/server'
import {CityItem} from './SearchResultCityItem'
import {ResortItem} from './SearchResultResortItem'

export const singleResultContent = (props: SearchResponseType, key?: React.Key | null) => {
  return props.entity_type[0] === SearchEntityTypeEnum.CITY ? (
    <CityItem entity={props.entity as LocationCityResponse} key={key} />
  ) : (
    <ResortItem entity={props.entity as ResortResponseItem} key={key} />
  )
}
