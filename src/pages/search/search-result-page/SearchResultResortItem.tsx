import {Grid} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {PlaceBriefFOrSearchResult} from 'src/shared/cart'
import {ResortResponseItem} from 'src/shared/types/server'

export const ResortItem = ({entity: resort}: {entity: ResortResponseItem}) => {
  const navigate = useNavigate()
  const {total_popularity_score, comment_count, media_list, description, name_fa, resort_id} = resort
  return (
    <Grid
      item
      xs={6}
      onClick={() => {
        navigate({pathname: `/things/${resort_id}`}, {state: {resort}})
      }}
    >
      <PlaceBriefFOrSearchResult
        resortId={`${resort_id}`}
        rate={total_popularity_score ?? 0}
        rateCount={comment_count}
        imageUrl={media_list.length > 0 ? media_list[0].url : ''}
        description={description}
        name={name_fa}
      />
    </Grid>
  )
}
