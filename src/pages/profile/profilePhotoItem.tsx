import {Grid} from '@mui/material'
import {PlaceBriefCartWithImageAndName} from 'src/shared/cart'
import {ProfileMediaResponse} from 'src/shared/types/server/AuthTypes'

export const profilePhotoItem = (photo: ProfileMediaResponse, key?: React.Key | null) => (
  <Grid item xs={6} key={key}>
    <PlaceBriefCartWithImageAndName
      imageUrl={photo.media.url}
      name={photo.related_model?.name_fa ?? ''}
      resortId={photo.related_model?.resort_id?.toString()}
      author_member_id={photo.media.adder_by_id}
      mediaId={photo.media.media_id}
    />
  </Grid>
)
