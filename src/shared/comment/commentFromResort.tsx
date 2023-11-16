import {t} from '@lingui/macro'
import {Comment} from 'src/shared/comment'
import {CommentResponse} from 'src/shared/types/server'
import {getProfileName} from 'src/shared/utils/getProfileName'

export const commentFromResort = (comment: CommentResponse, key?: React.Key | null) => (
  <Comment
    key={key}
    userId={comment.author_id.toString()}
    imageList={comment.media_list.map((image) => ({alt: comment.author?.name || comment.content, imageUrl: image.url}))}
    isLikable={true}
    theme="dark"
    date={comment.experience_time ?? undefined}
    dislikeCount={comment.dislike_count}
    likeCount={comment.like_count}
    name={getProfileName(comment.author) || t`Unknown`}
    text={comment.content}
    rate={comment.score}
    commentId={comment.comment_id}
    author_member_id={comment.author?.member_id}
    impression_of_the_caller={comment.impression_of_the_caller}
    profileImage={comment.author?.profile_picture?.url}
    resort_id={comment.resort_id}
  />
)
