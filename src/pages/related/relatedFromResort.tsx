import {Entity} from 'src/shared/entity'
import {ResortResponseItem} from 'src/shared/types/server'

export const relatedFromResort = (resort: ResortResponseItem, key?: React.Key | null) => (
  <Entity
    key={key}
    entityProps={{
      location: `${resort.location.city.city_name_fa} - ${resort.location.city.province.province_name_fa}`,
      placeName: resort.name_fa,
      rate: resort.total_popularity_score || 0,
      voteCount: resort.comment_count || 0,
      id: resort.resort_id,
      resort,
    }}
    sliderContainerProps={{
      isRounded: true,
      list: resort.media_list,
    }}
  />
)
