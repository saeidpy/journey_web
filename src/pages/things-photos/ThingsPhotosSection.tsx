import {Stack, styled} from '@mui/material'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {singleThingsPhoto} from './singleThingsPhoto'
import {getResortPhotosQueryFn} from './thingsPhotos.query'

type ThingsPhotoType = {
  resortId: string
}

const Wrapper = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
})

export const ThingsPhotosSection = ({resortId}: ThingsPhotoType) => {
  return (
    <Wrapper>
      <ScrollBasedInfiniteQuery queryKey={['getResortPhotos', resortId]} queryFn={getResortPhotosQueryFn} selectData={singleThingsPhoto} />
    </Wrapper>
  )
}
