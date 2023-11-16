import {useParams} from 'react-router-dom'
import {commentFromResort} from 'src/shared/comment'

import {useUserProfile} from 'src/core/auth'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {resortCommentQuery} from './resortComment.query'

export const ThingsComments = () => {
  const {id = ''} = useParams<{id: string}>()
  const {user} = useUserProfile()
  return (
    <>
      <ScrollBasedInfiniteQuery
        queryKey={['ThingsComments', user !== undefined, id]}
        queryFn={resortCommentQuery}
        selectData={commentFromResort}
      />
    </>
  )
}
