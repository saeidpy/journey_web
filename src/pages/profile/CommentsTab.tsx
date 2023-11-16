import {Stack} from '@mui/material'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {profileCommentsQuery} from './profileComments.query'
import {singleComment} from './singleComment'

interface CommentsTabProps {
  profileId: string
}

export const CommentsTab = ({profileId}: CommentsTabProps) => {
  return (
    <Stack>
      <ScrollBasedInfiniteQuery queryKey={['CommentsTab', profileId]} queryFn={profileCommentsQuery} selectData={singleComment} />
    </Stack>
  )
}
