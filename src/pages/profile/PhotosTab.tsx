import {Grid} from '@mui/material'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {MediaResponse} from 'src/shared/types/server'
import {photoTabQuery} from './photoTab.query'
import {profilePhotoItem} from './profilePhotoItem'

type CartList = {
  initialMedia?: MediaResponse[]
  memberId: string
}
const PhotosTab = ({memberId}: CartList) => {
  return (
    <>
      <Grid container spacing={1}>
        <ScrollBasedInfiniteQuery
          queryKey={['profilePhotos', memberId]}
          queryFn={photoTabQuery}
          selectData={profilePhotoItem}
          // initialData={initialMedia?.map((item) => ({
          //   media: item,
          //   related_model_type: PlaceTypeEnum.RESIDENCE,
          //   related_model: null,
          // }))}
        />
      </Grid>
    </>
  )
}

export default PhotosTab
